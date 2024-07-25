import time
from typing import List, Dict, Union, Tuple

import ws
from song import Song


# TODO: migrate wishlist to user if they log in
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

    @classmethod
    def get_song_date_and_wish_count(cls, song: 'Song') -> Tuple[int, float]:
        """
        Returns the firste time this song was wished across all wishlists
        and how often this song occurs in all wishlists.

        :param song: The song to get the count for
        :return: The count and the date (float in s)
        """

        count = 0
        date = time.time()

        for wishlist in cls.wishlists.values():
            if song.id in wishlist.songs:
                count += 1
                date = min(wishlist.songs[song.id][0], date)

        return count, date

    @classmethod
    def get_wish_json(cls, date, song, global_count_and_date=False) -> Dict[str, Union[int, dict]]:
        """
        Creates the json representation of a single wish.

        :param date: The date of the wish
        :param song: The wished song
        :param global_count_and_date: If the global count and date should be used (count will always be 1 otherwise)
        :return: The json representation
        """

        count = 1
        if global_count_and_date:
            count, date = cls.get_song_date_and_wish_count(song)

        return {
            "count": count,
            "date": round(date * 1000),
            "song": song.to_json()
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

    def to_json(self, global_count_and_date=False) -> Dict[str, List[Dict[str, Union[int, 'Song']]]]:
        """
        Creates a list of all wishes to be used in the api

        :param global_count_and_date: If the global count and date should be used (count will always be 1 otherwise)
        :return: A list of wishes
        """

        return {
            "wishes": [self.get_wish_json(date, song, global_count_and_date=global_count_and_date) for date, song in self.songs.values()]
        }

    async def add_song(self, song: Song):
        """
        Adds a song to the wishlist

        :param song: The song to add
        """

        date = time.time()

        self.songs[song.id] = date, song

        await ws.broadcast(ws.MessageType.wish_added, self.get_wish_json(date, song, global_count_and_date=True))

    async def remove_song(self, song: Union[str, Song]):
        """
        Adds a song to the wishlist

        :param song: The song to add
        """

        song_id = song

        if isinstance(song, Song):
            song_id = song_id

        if song_id in self.songs:
            date, song = self.songs.pop(song_id)

            await ws.broadcast(ws.MessageType.wish_removed, self.get_wish_json(date, song, global_count_and_date=True))
