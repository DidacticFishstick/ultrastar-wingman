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
    downloaded: bool
    edition: str
    golden: bool
    id: str
    language: str
    rating: float
    title: str
    views: int


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
