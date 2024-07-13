from typing import List

from pydantic import BaseModel, Field


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


class PlayerConfig(BaseModel):
    colors: List[str] = Field(None, description="The available colors")
    players: List[str] = Field(None, example=["Alice", "Bob", "Charlie"], description="List of player names.")


class PlayerList(BaseModel):
    players: List[str] = Field(None, example=["Alice", "Bob", "Charlie"], description="List of player names.")


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
