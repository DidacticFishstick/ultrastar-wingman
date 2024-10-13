from typing import List, Optional, Dict

from pydantic import BaseModel, Field


class UltrastarWingmanState(BaseModel):
    version: Optional[str] = Field(None, description="The current version of Ultrastar Wingman")
    new_version: Optional[str] = Field(None, description="The new version if one is available")
    client_url: str = Field(None, description="The url for the clients to use (to be shown as a QR code)")


class BasicResponse(BaseModel):
    success: bool = Field(None, example=True, description="Success response")


class UsdbId(BaseModel):
    id: str = Field(None, description="The USDB ID.")


class UsdbIdsList(BaseModel):
    ids: List[str] = Field(None, description="A list of USDB IDs.")


class Song(BaseModel):
    directory: str = Field(description="The directory of the song.")
    title: str = Field(description="The title of the song.")
    artist: str = Field(description="The artist of the song.")
    usdb_id: str = Field(nullable=True, description="The USDB ID of the song.")
    id: str = Field(description="The universal ID of the song.")
    duration: float = Field(description="The duration of the song in seconds.")


class SongsResponse(BaseModel):
    songs: List[Song]


class USDBSong(BaseModel):
    artist: str
    creator: str
    downloaded: bool
    edition: str
    genre: str
    golden: bool
    id: str
    language: str
    rating: float
    title: str
    views: int
    year: str


class Paging(BaseModel):
    current: int
    pages: int


class USDBSongsResponse(BaseModel):
    paging: Paging
    songs: List[USDBSong]


class PlayerCreation(BaseModel):
    name: str = Field(None, description="The player name.")


class RegisteredPlayerModel(BaseModel):
    id: str = Field(None, description="The id for the player.")
    name: str = Field(None, description="The name of the player.")
    access_level: int = Field(None, description="The access level for the player.")


class RegisteredPlayerPatchModel(BaseModel):
    access_level: Optional[int] = Field(None, description="The access level for the player.")


class RegisteredPlayerWithIdPatchModel(RegisteredPlayerPatchModel):
    id: str = Field(None, description="The id for the player.")


class UnregisteredPlayerModel(BaseModel):
    id: str = Field(None, description="The id for the player.")
    name: str = Field(None, description="The name of the player.")


class PlayersModel(BaseModel):
    registered: List[RegisteredPlayerModel] = Field(None, description="List of registered players.")
    unregistered: List[UnregisteredPlayerModel] = Field(None, description="List of unregistered players.")


class RegisteredPlayersModel(BaseModel):
    registered: List[RegisteredPlayerModel] = Field(None, description="List of registered players.")


class RegisteredPlayersPatchModel(BaseModel):
    registered: List[RegisteredPlayerWithIdPatchModel] = Field(None, description="List of registered player patches.")


class PlayerConfig(BaseModel):
    colors: List[str] = Field(None, description="The available colors")
    players: PlayersModel = Field(None, description="All available players")


class AccessLevel(BaseModel):
    value: int = Field(None, description="The value for the access level.")
    title: str = Field(None, description="The title of the access level.")


class PermissionModel(BaseModel):
    id: str = Field(None, description="An id for the permission.")
    title: str = Field(None, description="The title for the permission.")
    description: str = Field(None, description="The description for the permission.")
    min_access_level: int = Field(None, description="The minimum access level for the permission.")


class PermissionPatchModel(BaseModel):
    id: str = Field(None, description="The id for the permission.")
    min_access_level: int = Field(None, description="The minimum access level for the permission.")


class PermissionsModel(BaseModel):
    access_levels: List[AccessLevel] = Field(None, description="All available access levels.")
    permissions: Dict[str, PermissionModel] = Field(None, description="All available permissions.")


class PermissionsPatchModel(BaseModel):
    permissions: Dict[str, PermissionPatchModel] = Field(None, description="Permissions to patch.")


class PermissionsPatchResponseModel(BaseModel):
    permissions: Dict[str, PermissionModel] = Field(None, description="Patched permissions.")


class Score(BaseModel):
    usdx_id: int = Field(None, description="The id internally used by UltraStar Deluxe")
    artist: str = Field(None, description="The artist of the song.")
    title: str = Field(None, description="The title of the song.")
    song_id: str = Field(None, description="The id of the song (must not be the correct one as it has to be matched by title and artist :/).")
    difficulty: int = Field(None, description="The difficulty of the song.")
    player: str = Field(None, description="The player name.")
    score: int = Field(None, description="The score of the performance.")
    date: int = Field(None, description="The date of the performance.")


class SessionModel(BaseModel):
    id: int = Field(None, description="The session ID.")
    start_time: int = Field(None, description="The start time of the session.")
    end_time: int = Field(None, description="The end time of the session.")


class SessionsListModel(BaseModel):
    sessions: List[SessionModel] = Field(None, description="List of sessions.")


class ScoresModel(BaseModel):
    session: SessionModel = Field(None, description="The session this data is for.")
    scores: List[Score] = Field(None, description="List of scores.")


class SingModel(BaseModel):
    force: bool = Field(False, description="Force a song change if another song is currently playing.")
    player_ids: List[str] = Field(None, description="List of player ids.")


class WishModel(BaseModel):
    count: int = Field(None, description="The number of wishes for this song.")
    date: int = Field(None, description="The timestamp of the wish (the first timestamp for this song if count > 1).")
    song: Song


class WishlistModel(BaseModel):
    wishes: List[WishModel]


class AddToWishListModel(BaseModel):
    song_id: str = Field(description="The universal ID of the song.")
