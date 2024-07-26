import os
import asyncio
import logging
import os.path
from contextlib import asynccontextmanager

import uvicorn
from typing import Optional
from fastapi import FastAPI, Request, HTTPException, Query, status, Response, WebSocket, WebSocketDisconnect, Depends, UploadFile, File
from fastapi.responses import FileResponse

import config
import models
import usdb
import usdx
import ws
import scores
from song import Song
from wishlist import Wishlist

from users.db import User, create_db_and_tables, async_session_maker
from users.schemas import UserCreate, UserRead, UserUpdate
from users.users import auth_backend, current_active_user, fastapi_users
from users.players import Player
import users.permissions as permissions

SCRIPT_BASE_PATH = os.path.abspath(os.path.dirname(__file__))


@asynccontextmanager
async def lifespan(app: FastAPI):
    # start consumers for the download queue
    download_consumers = [asyncio.create_task(usdb.download_queue_consumer(download_queue)) for _ in range(config.usdb_downloader_count)]
    await create_db_and_tables()
    yield


app = FastAPI(
    title="UltraStar Wingman",
    version="1.1.0",
    lifespan=lifespan
)

download_queue = asyncio.Queue()
event_loop = asyncio.get_event_loop()

# region users

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


# endregion


@app.get('/openapi_no_anyOf.json', include_in_schema=False)
async def api_usdb_ids():
    """
    This should not be necessary but https://www.npmjs.com/package/@openapitools/openapi-generator-cli has a problem
    with generating code for models with a type set to anyOf. Therefor this endpoint will remove those anyOf sections.

    Currently only removes anyOf from the ValidationError (components.schemas.ValidationError.properties.loc.items.anyOf)
    """

    def replace_anyof_with_type(data):
        if isinstance(data, dict):
            if "anyOf" in data:
                first_element = data["anyOf"][0]
                if isinstance(first_element, dict) and "type" in first_element:
                    data["type"] = first_element["type"]
                del data["anyOf"]
            for key in data:
                replace_anyof_with_type(data[key])
        elif isinstance(data, list):
            for item in data:
                replace_anyof_with_type(item)
        return data

    openapi = app.openapi()

    return replace_anyof_with_type(openapi)


# @app.post('/api/usdx/start', response_model=models.BasicResponse, tags=["UltraStar Deluxe"], summary="Starts UltraStar Deluxe without any parameters")
# async def api_usdx_start():
#     await usdx.start()
#     return {"success": True}


# @app.post('/api/usdx/restart', response_model=models.BasicResponse, tags=["UltraStar Deluxe"], summary="Restarts UltraStar Deluxe without any parameters")
# async def api_usdx_restart():
#     await usdx.start(kill_previous=True)
#     return {"success": True}


@app.post('/api/usdx/kill', response_model=models.BasicResponse, tags=["UltraStar Deluxe"], summary="Kills any currently running Ultrastar Deluxe process")
async def api_usdx_kill(_: User = Depends(permissions.user_permissions(permissions.songs_stop))):
    await usdx.kill()
    return {"success": True}


@app.get('/api/usdb/ids', response_model=models.UsdbIdsList, tags=["USDB"], summary="Gets the list of all downloaded USDB IDs")
async def api_usdb_ids(_: User = Depends(permissions.user_permissions(permissions.usdb_browse))):
    return {"ids": list(Song.usdb_ids)}


@app.post('/api/usdb/download', response_model=models.BasicResponse, tags=["USDB"], summary="Downloads the song with the given USDB ID")
async def api_usdb_download(usdb_id_model: models.UsdbId, _: User = Depends(permissions.user_permissions(permissions.usdb_download))):
    await download_queue.put(usdb_id_model.id)

    await ws.broadcast(ws.MessageType.download_queued, {
        "usdb_id": usdb_id_model.id
    })

    return {"success": True}


@app.api_route('/proxy/{path:path}', tags=["USDB Proxy"], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH', 'TRACE'], include_in_schema=False)
async def proxy(request: Request, path: Optional[str] = '', _: User = Depends(permissions.user_permissions(permissions.usdb_browse_proxy))):
    # Define the base URL for the proxied requests
    base_url = "https://usdb.animux.de"

    # Collect incoming request data
    request_method = request.method
    request_body = await request.body()
    request_query_params = request.query_params
    request_headers = dict(request.headers)

    # Ensure we don't accidentally forward Host headers as it could cause issues
    request_headers.pop("host", None)

    # Construct the full URL
    url = f"{base_url}/{path}"

    # Forward the request to the target API
    response = await usdb.session.request(
        method=request_method,
        url=url,
        content=request_body,
        params=request_query_params,
        headers=request_headers,
        cookies=request.cookies,
    )

    forwarded_response_headers = {key: value for key, value in response.headers.items() if key.lower() not in ['content-encoding', 'content-length']}

    return Response(content=response.content, status_code=response.status_code, headers=forwarded_response_headers)


@app.get('/api/usdb/songs', response_model=models.USDBSongsResponse, tags=["USDB"], summary="Search Songs", response_description="A list of songs matching the criteria")
async def api_usdb_songs(
        artist: str = Query(None, nullable=True, description="Filter songs by the artist's name."),
        title: str = Query(None, nullable=True, description="Filter songs by title."),
        edition: str = Query(None, nullable=True, description="Filter by the song's edition."),
        language: str = Query(None, nullable=True, description="Filter songs by language."),
        genre: str = Query(None, nullable=True, description="Filter songs by genre."),
        order: usdb.OrderEnum = Query(usdb.OrderEnum.rating, description="Sort the result by this order criteria."),
        ud: usdb.UdEnum = Query(usdb.UdEnum.desc, description="Sort order: ascending (asc) or descending (desc)."),
        golden: bool = False,
        songcheck: bool = False,
        limit: int = Query(30, description="The number of songs to return per page."),
        page: int = Query(1, description="Page number for pagination."),
        _: User = Depends(permissions.user_permissions(permissions.usdb_browse))
):
    songs = await usdb.get_songs(
        artist,
        title,
        edition,
        language,
        genre,
        order,
        ud,
        golden,
        songcheck,
        limit,
        page
    )

    for song in songs["songs"]:
        song["downloaded"] = song["id"] in Song.usdb_ids

    return songs


def get_client_identifier(request: Request) -> str:
    """
    Creates an identifier for the client based its request.
    Currently, the host is used as the client identifier.

    :param request: The request object.
    :return: The identifier
    """

    x_forwarded_for = request.headers.get("X-Forwarded-For")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    else:
        return request.client.host


@app.get('/api/songs', response_model=models.SongsResponse, summary="Retrieve all downloaded songs", response_description="A list of songs", tags=["Songs"])
async def api_songs(_: User = Depends(permissions.user_permissions(permissions.songs_browse))):
    return {"songs": Song.song_list()}


@app.get('/api/songs/{song_id}', response_model=models.Song, summary="Retrieve the song with the given id. Use id 'random' for a random song or 'current' for the currently playing song.", response_description="The song", tags=["Songs"])
async def api_get_song_by_id(song_id, _: User = Depends(permissions.user_permissions(permissions.songs_browse))):
    song = Song.get_song_by_id(song_id)

    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")

    return song.to_json()


@app.get('/api/songs/{song_id}/cover', tags=["Songs"])
async def api_cover(song_id, _: User = Depends(permissions.user_permissions(permissions.songs_browse))):
    song = Song.get_song_by_id(song_id)

    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")

    if song.cover_path:
        return FileResponse(song.cover_path)
    else:
        # Use logo as default cover
        return FileResponse(os.path.join(SCRIPT_BASE_PATH, "frontend/public/logo.png"))


@app.get('/api/songs/{song_id}/mp3', tags=["Songs"])
async def api_mp3(song_id, _: User = Depends(permissions.user_permissions(permissions.songs_browse))):
    song = Song.get_song_by_id(song_id)

    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")

    if song.mp3:
        return FileResponse(os.path.join(song.directory, song.mp3))
    else:
        raise HTTPException(status_code=404, detail="mp3 not found")


@app.post('/api/songs/{song_id}/sing', response_model=models.BasicResponse, tags=["Songs"], summary="Starts UltraStar Deluxe and loads the song")
async def api_sing_song(song_id, sing_model: models.SingModel, _: User = Depends(permissions.user_permissions(permissions.songs_play))):
    if Song.active_song is not None and Song.active_song.id == song_id:
        return {"success": True}

    song = Song.get_song_by_id(song_id)

    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")

    if await song.sing(sing_model.players, force=sing_model.force):
        return {"success": True}
    else:
        raise HTTPException(status_code=409, detail="Another song is already playing")


@app.get('/api/players', response_model=models.PlayerConfig, summary="Retrieve Players", response_description="A list of unique player names", tags=["Players"])
async def api_players(_: User = Depends(permissions.user_permissions(permissions.players_view))):
    """
    Retrieves a list of all unique player names and the available colors.
    """

    registered, unregistered = await Player.all_players()

    return {
        "players": {
            "registered": [player.to_json() for player in registered],
            "unregistered": [player.to_json() for player in unregistered]
        },
        "colors": config.setup_colors
    }


@app.post('/api/players', response_model=models.PlayerList, status_code=status.HTTP_201_CREATED, summary="Add a New Player", response_description="Confirmation of player addition", tags=["Players"])
async def api_players_add(player_data: models.PlayerCreation, _: User = Depends(permissions.user_permissions(permissions.players_add))):
    """
    Adds a new player name to the list.
    If the operation is successful, it returns a success message. Otherwise, it raises an HTTPException.
    """

    try:
        await Player.new_temporary(player_data.name)
        return {"success": True}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@app.delete('/api/players', response_model=models.BasicResponse, status_code=status.HTTP_200_OK, summary="Delete a Player", response_description="Confirmation of player deletion", tags=["Players"])
async def api_players_delete(name: str = Query(..., description="The name of the player to delete."), _: User = Depends(permissions.user_permissions(permissions.players_remove))):
    """
    Deletes a player name from the list.
    If the operation is successful, it returns a success message.
    """

    Player.delete_temporary(name)

    return {"success": True}


@app.get('/api/players/avatars/default/{color}', tags=["Players"])
async def api_get_default_avatar(color, _: User = Depends(permissions.user_permissions(permissions.players_view))):
    """
    The default avatars (cat pictures)

    :param color: The color
    """

    try:
        return FileResponse(os.path.join(SCRIPT_BASE_PATH, "avatars", f"cat_{color}.jpg"))
    except FileNotFoundError:
        return FileResponse(os.path.join(SCRIPT_BASE_PATH, "avatars", "cat_rainbow.jpg"))


@app.get('/api/players/registered/{player}/avatar', tags=["Players"])
async def api_get_player_avatar(player):
    """
    The avatar for the given player

    :param player: The player id
    """

    player = await Player.get_by_id(player)
    if player is None:
        raise HTTPException(status_code=404, detail="Player does not exist")

    return player.get_avatar(config.users_dir)


@app.post("/api/players/registered/{player}/avatar", response_model=models.BasicResponse, status_code=status.HTTP_200_OK, summary="Upload an avatar for the player", response_description="Confirmation of file upload", tags=["Players"])
async def api_post_player_avatar(player, file: UploadFile = File(...), user: User = Depends(current_active_user)):
    """
    Sets the avatar for the given player

    :param player: The player id
    :param user: The current user
    """

    if str(user.id) != player:
        raise HTTPException(status_code=403, detail="You are not allowed to change other players avatars")

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    player = await Player.get_by_id(player)
    await player.set_avatar(config.users_dir, file)

    return {"success": True}


@app.get('/api/sessions', response_model=models.SessionsListModel, status_code=status.HTTP_200_OK, summary="Get all sessions", response_description="The sessions", tags=["Scores"])
async def api_sessions_get(_: User = Depends(permissions.user_permissions(permissions.scores_view_current))):
    """
    Gets all the sessions.
    """

    # TODO: check if the player is allowed to see more than the current session

    return {
        "sessions": scores.get_sessions()
    }


@app.get('/api/scores', response_model=models.ScoresModel, status_code=status.HTTP_200_OK, summary="Get session scores", response_description="The scores", tags=["Scores"])
@app.get('/api/scores/{session_id}', response_model=models.ScoresModel, status_code=status.HTTP_200_OK, summary="Get session scores", response_description="The scores", tags=["Scores"])
async def api_scores_get(session_id: int = None, _: User = Depends(permissions.user_permissions(permissions.scores_view_current))):
    """
    Gets all the data for the specified session id.
    """

    # TODO: check if the player is allowed to see more than the current session

    data = scores.get_session_data(session_id)

    if data is None:
        raise HTTPException(status_code=404, detail="Session does not exist")

    return data


@app.get('/api/wishlist/client', response_model=models.WishlistModel, status_code=status.HTTP_200_OK, summary="Get the clients wishlist", response_description="The songs on the wishlist", tags=["Wishlist"])
async def api_wishlist_client_get(request: Request, _: User = Depends(permissions.user_permissions(permissions.wishlist_edit))):
    """
    Gets the songs on the wishlist for the current client.

    :param request: The request used to determine the client
    """

    return Wishlist.get_wishlist(get_client_identifier(request)).to_json()


@app.post('/api/wishlist/client', response_model=models.BasicResponse, status_code=status.HTTP_201_CREATED, summary="Adds the given song_id to the wishlist of the client", response_description="Confirmation of wishlist addition", tags=["Wishlist"])
async def api_wishlist_client_post(request: Request, add_to_wishlist: models.AddToWishListModel, _: User = Depends(permissions.user_permissions(permissions.wishlist_edit))):
    """
    Adds a song to the list.

    :param request: The request used to determine the client
    :param add_to_wishlist: The information what to add to the wishlist
    """

    song = Song.get_song_by_id(add_to_wishlist.song_id)

    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")

    wishlist = Wishlist.get_wishlist(get_client_identifier(request))

    await wishlist.add_song(song)

    return {"success": True}


@app.delete('/api/wishlist/client', response_model=models.BasicResponse, status_code=status.HTTP_200_OK, summary="Delete a song from the wishlist", response_description="Confirmation of wishlist deletion", tags=["Wishlist"])
async def api_wishlist_client_delete(request: Request, song_id: str = Query(..., description="The id of the song to delete."), _: User = Depends(permissions.user_permissions(permissions.wishlist_edit))):
    """
    Deletes a song form the clients wishlist.

    :param request: The request used to determine the client
    :param song_id: The id of the song to delete.
    """

    wishlist = Wishlist.get_wishlist(get_client_identifier(request))

    await wishlist.remove_song(song_id)

    return {"success": True}


@app.get('/api/wishlist/global', response_model=models.WishlistModel, status_code=status.HTTP_200_OK, summary="Get the global wishlist with the wishes for all players", response_description="The songs on the wishlist", tags=["Wishlist"])
async def api_wishlist_global_get(_: User = Depends(permissions.user_permissions(permissions.wishlist_view))):
    """
    Gets the global wishlist.
    """

    return Wishlist.get_global_wishlist()


@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    # TODO: somehow include in permission management
    await websocket.accept()
    ws.ws_connections.add(websocket)
    logging.info("WebSocket client connected")
    try:
        while True:
            data = await websocket.receive_text()
            logging.info(f"Received message from websocket: {data}")
    except WebSocketDisconnect:
        ws.ws_connections.remove(websocket)


async def main():
    # login to usdb.animux.de
    await usdb.login()

    # load all session
    scores.init_sessions()

    # load all downloaded songs
    Song.load_songs()

    # TODO: move to the place where sing ist started
    # configure usdx
    usdx.change_config(config.setup_colors)

    # start the server
    server_config = uvicorn.Config(app="main:app", host="0.0.0.0", port=8080, log_level="info")
    server = uvicorn.Server(server_config)
    await server.serve()


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] %(levelname)-8s %(name)-12s %(message)s',
    )

    asyncio.run(main())
