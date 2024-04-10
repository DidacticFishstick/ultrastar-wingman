from typing import List

from pydantic import BaseModel, Field


class BasicResponse(BaseModel):
    success: bool = Field(None, example=True, description="Success response")


class UsdbId(BaseModel):
    id: str = Field(None, description="The USDB ID.")


class UsdbIdsList(BaseModel):
    ids: List[str] = Field(None, description="A list of USDB IDs.")


class Song(BaseModel):
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


class SongsResponse(BaseModel):
    paging: Paging
    songs: List[Song]

class PlayerCreation(BaseModel):
    name: str = Field(None, description="The player name.")

class PlayerList(BaseModel):
    players: List[str] = Field(None, example=["Alice", "Bob", "Charlie"], description="List of player names.")
