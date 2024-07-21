import time
from typing import List, Dict, Union, Tuple
from song import Song


class Wishlist:
    wishlists: Dict[str, 'Wishlist'] = {}

    @classmethod
    def get_wishlist(cls, client_id: str) -> 'Wishlist':
        """
        Returns the wishlist for a given client ID.
        If the wishlist does not exist, it will be created.

        :param client_id: The client ID.
        :return: The wishlist
        """

        return cls.wishlists.get(client_id) or cls(client_id)

    @classmethod
    def get_global_wishlist(cls) -> Dict[str, List[Dict[str, Union[int, dict]]]]:
        """
        Creates the global wishlist as used by the api

        :return: wishlist dictionary
        """
        data = {}

        for wishlist in cls.wishlists.values():
            for date, song in wishlist.songs.values():
                if song.id in data:
                    data[song.id]["count"] += 1
                    data[song.id]["date"] = min(round(date * 1000), data[song.id]["date"])
                else:
                    data[song.id] = {
                        "count": 1,
                        "date": round(date * 1000),
                        "song": song.to_json()
                    }

        return {
            "wishes": list(data.values())
        }

    def __init__(self, client_id: str):
        """
        Creates a new empty wishlist

        :param client_id: The id for the client this wishlist is for
        """

        self.client_id = client_id

        # timestamp and song under the song id
        self.songs: Dict[str, Tuple[float, Song]] = {}

        self.wishlists[client_id] = self

    def __str__(self):
        return f"[Wishlist for {self.client_id}]"

    def __repr__(self):
        return str(self)

    def to_json(self) -> Dict[str, List[Dict[str, Union[int, 'Song']]]]:
        """
        Creates a list of all wishes to be used in the api

        :return: A list of wishes
        """

        return {
            "wishes": [{
                "count": 1,
                "date": round(date * 1000),
                "song": song.to_json()
            } for date, song in self.songs.values()]
        }

    def add_song(self, song: Song):
        """
        Adds a song to the wishlist

        :param song: The song to add
        """

        self.songs[song.id] = time.time(), song

    def remove_song(self, song: Union[str, Song]):
        """
        Adds a song to the wishlist

        :param song: The song to add
        """

        song_id = song

        if isinstance(song, Song):
            song_id = song_id

        if song_id in self.songs:
            self.songs.pop(song_id)
