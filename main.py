import getpass
import os
import asyncio
import logging
import os.path
import platform
import signal
import subprocess
import uvicorn
from typing import Optional
from fastapi import FastAPI, Request, HTTPException, Query, Form, status, Response
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import config
import models
import usdb
import usdx
from song import Song
from websocket_server import WebSocketServer, messages

SCRIPT_BASE_PATH = os.path.abspath(os.path.dirname(__file__))

app = FastAPI(
    title="UltraStar Wingman",
    version="1.1.0",
)
app.mount("/static", StaticFiles(directory=os.path.join(SCRIPT_BASE_PATH, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(SCRIPT_BASE_PATH, "templates"))

usdx_process = None
download_queue = asyncio.Queue()
event_loop = asyncio.get_event_loop()
php_session_id = None


def restart_usdx():
    global usdx_process
    if usdx_process is not None:
        logging.info("Stopping USDX")

        if platform.system() == "Windows":
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(usdx_process.pid)])
        else:
            os.kill(usdx_process.pid, signal.SIGKILL)

    logging.info("Starting USDX")
    usdx_process = subprocess.Popen(str(config.usdx_path))


@app.get('/', tags=["Website"], response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse('index.html', {"request": request, "messages": messages})


@app.get('/songs', tags=["Website"], response_class=HTMLResponse)
async def songs(request: Request):
    return templates.TemplateResponse('songs.html', {"request": request, "songs": Song.song_list(), "messages": messages})


@app.get('/avatars/{avatar}', tags=["Website"])
async def avatar(avatar):
    try:
        return FileResponse(os.path.join(SCRIPT_BASE_PATH, "avatars", f"cat_{avatar}"))
    except FileNotFoundError:
        return FileResponse(os.path.join(SCRIPT_BASE_PATH, "avatars", "cat_rainbow.jpg"))


@app.get('/download', tags=["Website"], response_class=HTMLResponse)
async def download(request: Request, view: str = None):
    if view == "usdb":
        return templates.TemplateResponse('download.html', {"request": request, "messages": messages})
    else:
        return templates.TemplateResponse('download_list.html', {"request": request, "messages": messages})


@app.get('/scores', tags=["Website"], response_class=HTMLResponse)
async def scores(request: Request):
    return templates.TemplateResponse('scores.html', {"request": request, "messages": messages})


@app.get('/players', tags=["Website"], response_class=HTMLResponse)
async def players(request: Request):
    return templates.TemplateResponse('players.html', {"request": request, "messages": messages, "colors": config.setup_colors})


@app.post('/api/usdx/restart', response_model=models.BasicResponse, tags=["UltraStar Deluxe"], summary="Restarts UltraStar Deluxe")
async def api_usdx_restart():
    restart_usdx()
    return {"success": True}


@app.get('/api/usdb/ids', response_model=models.UsdbIdsList, tags=["USDB"], summary="Gets the list of all downloaded USDB IDs")
async def api_usdb_ids():
    return {"ids": list(Song.usdb_ids)}


@app.post('/api/usdb/download', response_model=models.BasicResponse, tags=["USDB"], summary="Downloads the song with the given USDB ID")
async def api_usdb_download(usdb_id: models.UsdbId):
    # TODO: fix queue
    asyncio.run_coroutine_threadsafe(download_queue.put(usdb_id.id), event_loop)

    return {"success": True}


@app.api_route('/usdb/{path:path}', tags=["USDB Proxy"], methods=['GET', 'POST', 'PUT', 'DELETE'])
async def proxy(request: Request, path: Optional[str] = ''):
    # Prepare the URL by replacing the incoming request's URL part
    # with the target URL's base, keeping the path and query parameters.
    target_url = str(request.url).replace(f"{request.url.scheme}://{request.url.netloc}/usdb/", "https://usdb.animux.de/")

    # Prepare headers, removing or modifying problematic ones
    forwarded_headers = {key: value for key, value in request.headers.items() if key.lower() not in ['host', 'content-length', 'content-encoding']}

    # Assemble request parameters to forward, including method, url, and headers.
    # The body will be streamed directly from the request to the target service.
    request_params = {
        "method": request.method,
        "url": target_url,
        "headers": forwarded_headers,
        "content": await request.body(),
    }

    # Forward the request to the target service asynchronously
    response = await usdb.session.request(**request_params)

    # Remove 'content-encoding' and 'content-length' from response headers to avoid conflicts
    forwarded_response_headers = {key: value for key, value in response.headers.items() if key.lower() not in ['content-encoding', 'content-length']}

    # Return the proxied response content, status code, and headers back to the client
    return Response(content=response.content, status_code=response.status_code, headers=forwarded_response_headers)


@app.get('/api/usdb/songs', response_model=models.SongsResponse, tags=["USDB"], summary="Search Songs", response_description="A list of songs matching the criteria")
async def api_usdb_songs(
        artist: Optional[str] = Query(None, description="Filter songs by the artist's name."),
        title: Optional[str] = Query(None, description="Filter songs by title."),
        edition: Optional[str] = Query(None, description="Filter by the song's edition."),
        language: Optional[str] = Query(None, description="Filter songs by language."),
        genre: Optional[str] = Query(None, description="Filter songs by genre."),
        order: usdb.OrderEnum = Query(usdb.OrderEnum.rating, description="Sort the result by this order criteria."),
        ud: usdb.UdEnum = Query(usdb.UdEnum.desc, description="Sort order: ascending (asc) or descending (desc)."),
        golden: bool = False,
        songcheck: bool = False,
        limit: int = Query(30, description="The number of songs to return per page."),
        page: int = Query(1, description="Page number for pagination.")
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


@app.get('/api/songs/{song_id}/cover', tags=["Songs"])
async def cover(song_id):
    song = Song.get_song_by_id(song_id)

    if song.cover_path:
        # return send_file(song.cover_path, mimetype=f'image/{song.cover_path.rsplit(".", 1)[-1].lower()}')
        return FileResponse(song.cover_path)
    else:
        # TODO: default cover
        raise HTTPException(status_code=404, detail="Song not found")


@app.get('/api/players', response_model=models.PlayerList, summary="Retrieve Players", response_description="A list of unique player names", tags=["Players"])
async def api_players():
    """
    Retrieves a list of all unique player names.
    """

    try:
        with open(config.players_file, 'r') as file:
            names = file.read().splitlines()
        return {"players": sorted(set(names))}
    except FileNotFoundError:
        return {"players": []}


@app.post('/api/players', response_model=models.PlayerList, status_code=status.HTTP_201_CREATED, summary="Add a New Player", response_description="Confirmation of player addition", tags=["Players"])
async def api_players_add(player_data: models.PlayerCreation):
    """
    Adds a new player name to the list.

    - **name**: The name of the player to add. It is taken from the form data.

    This endpoint writes the new player's name to the players file, appending it to the end.
    If the operation is successful, it returns a success message. Otherwise, it raises an HTTPException.
    """

    logging.info(f"Adding player '{player_data.name}'")
    try:
        with open(config.players_file, 'a') as file:
            file.write(player_data.name + '\n')
        return {"success": True}
    except IOError as e:
        raise HTTPException(status_code=500, detail="Failed to write to file") from e


@app.delete('/api/players/', response_model=models.BasicResponse, status_code=status.HTTP_200_OK, summary="Delete a Player", response_description="Confirmation of player deletion", tags=["Players"])
async def delete_name(name: str = Query(..., description="The name of the player to delete.")):
    """
    Deletes a player name from the list.

    - **name**: The name of the player to delete.

    This endpoint reads all player names, filters out the specified name, and rewrites the file without it.
    If the operation is successful, it returns a success message.
    """

    logging.info(f"Deleting player '{name}'")
    try:
        with open(config.players_file, 'r') as file:
            names = file.read().splitlines()
        with open(config.players_file, 'w') as file:
            for name_item in names:
                if name_item != name:
                    file.write(name_item + '\n')
    except FileNotFoundError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Players file not found.")
    except IOError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update the file") from e

    return {"success": True}


@app.post('/api/players/submit', response_model=models.BasicResponse, status_code=status.HTTP_200_OK, summary="Submit Player Names", response_description="Confirmation of successful name submission", tags=["Players"])
async def api_players_submit(submit_request: models.PlayerList):
    """
    Submits a list of player names.

    - **names**: A list of names to be submitted.

    Accepts a list of names in the request body and submits them.
    """

    try:
        usdx.enter_names(submit_request.players)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to submit names") from e

    return {"success": True}


async def main():
    username = config.usdb_user
    password = config.usdb_pass
    if username == "<username>" or password == "<password>":
        username = None
        password = None

    while True:
        if username is None or password is None:
            print(f"To download songs, you need an account on https://usdb.animux.de. Create an account and enter the credentials below. You can always change these settings in the config file '{config.file_name}'.")
            new_username = input("Username: ")
            new_password = getpass.getpass("Password: ")

            # Windows doing windows things...
            while new_password == "\x16":
                print("The windows cmd does not allow pasting into password fields using ctrl+V. Instead you can right click in the terminal to paste your password")
                new_password = getpass.getpass("Password: ")

            if new_username != username or new_password != password:
                config.save_usdb_credentials(new_username, new_password)
                username, password = new_username, new_password

        if await usdb.login(username, password):
            print("Login on https://usdb.animux.de successful")
            break
        else:
            print("Invalid credentials. Please try again.")
            username = None
            password = None

    usdx.change_config(config.setup_colors)

    Song.load_songs()

    restart_usdx()

    # TODO: websocket stuff (migrate to FastAPI)
    # server = WebSocketServer(download_queue)
    #
    # start_server = websockets.serve(server.handler, "0.0.0.0", 5678)
    #
    # asyncio.get_event_loop().run_until_complete(start_server)
    #
    # for i in range(8):
    #     asyncio.get_event_loop().create_task(server.download_queue_consumer(i))
    #
    # asyncio.get_event_loop().run_forever()

    server_config = uvicorn.Config(app="main:app", host="0.0.0.0", port=8080, log_level="info")
    server = uvicorn.Server(server_config)

    await server.serve()


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] %(levelname)-8s %(name)-12s %(message)s',
    )

    asyncio.run(main())
