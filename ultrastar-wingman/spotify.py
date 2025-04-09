import logging
import os
from typing import Optional

from spotipy.oauth2 import SpotifyOAuth, SpotifyOauthError

import spotipy

import config


def _create_auth_manager(token_path):
    return SpotifyOAuth(
        client_id=config.spotify_client_id,
        client_secret=config.spotify_client_secret,
        redirect_uri=f"{config.client_url.rstrip('/')}/spotify/callback",
        scope="user-library-read,playlist-read-private,playlist-read-collaborative",
        cache_path=token_path,
        open_browser = False
    )


class SpotifyClient:
    """
    A spotify client for one user

    To use this, <config.client_url>/spotify/callback must be added as a Redirect URI in https://developer.spotify.com/dashboard
    """

    def __init__(self, user_id: str):
        self.user_id: str = user_id
        self._token_cache_path = os.path.join(config.users_spotify_tokens_dir, self.user_id)

        self._auth_manager = _create_auth_manager(self._token_cache_path)

        self._client: Optional[spotipy.Spotify] = None

        if os.path.exists(self._token_cache_path):
            # try to connect using cached token
            try:
                self._client = spotipy.Spotify(auth_manager=self._auth_manager)
            except Exception as e:
                logging.exception("Failed to load spotify token from cache")

    def get_authorize_url(self) -> str:
        """
        Returns the authorize url

        :return: The authorize url
        """

        return self._auth_manager.get_authorize_url()

    def authorize(self, code: str) -> str:
        """
        Authorize the spotify client

        :param code: The code int the callback of the authorize url
        :raises SpotifyOauthError: if the authorization fails
        """

        self._auth_manager.get_access_token(code=code)

        self._client = spotipy.Spotify(auth_manager=self._auth_manager)

    def logout(self) -> str:
        """
        Logout from Spotify by resetting/forgetting auth manager and client

        If not logged in, nothing happens.
        """

        self._auth_manager = _create_auth_manager(self._token_cache_path)

        self._client = None

        try:
            os.remove(self._token_cache_path)
        except FileNotFoundError:
            pass

    @property
    def client(self) -> Optional[spotipy.Spotify]:
        """
        The spotify client
        None before successful authorization

        :return: The client
        """

        return self._client

    def get_me(self) -> dict:
        """
        Gets info about the user

        :return: The info
        :raises SpotifyOauthError: If the user is not authorized
        """

        try:
            return {
                "name": self.client.current_user()["display_name"]
            }
        except SpotifyOauthError as e:
            self.logout()
            raise e

    def get_playlists(self) -> dict:
        """
        Gets all users playlists

        :return: The playlists
        :raises SpotifyOauthError: If the user is not authorized
        """

        limit = 50
        offset = 0

        playlists = []

        while True:
            try:
                results = self.client.current_user_playlists(limit=limit, offset=offset)
            except SpotifyOauthError as e:
                self.logout()
                raise e

            for item in results['items']:
                playlists.append({
                    "id": item['id'],
                    "name": item['name'],
                    "image": item['images'][0].get("url") if item.get("images") else None,
                    "owner": item.get("owner", {}).get("display_name")
                })

            if results['next'] is None:
                break

            offset += limit

        return {
            "playlists": playlists
        }

    def get_playlist_items(self, playlist_id, limit=50, offset=0) -> dict:
        """
        The songs in the playlist

        If playlist_id is saved, the users saved songs will be used

        :param playlist_id: The playlist ID
        :param limit: The maximum number of results
        :param offset: The offset for the results
        :return: The playlist items
        :raises SpotifyOauthError: If the user is not authorized
        """

        from song import Song

        songs = []

        try:
            if playlist_id == "saved":
                results = self.client.current_user_saved_tracks(limit=limit, offset=offset)
            else:
                results = self.client.playlist_items(playlist_id, limit=limit, offset=offset)
        except SpotifyOauthError as e:
            self.logout()
            raise e

        for item in results['items']:
            if album := item['track'].get("album"):
                image = album['images'][0].get("url") if album.get("images") else None
            else:
                image = item['track']['images'][0].get("url") if item['track'].get("images") else None

            name = item['track']['name']
            artists = [a.get("name") for a in item['track']['artists']]

            songs.append({
                "id": item['track']['id'],
                "name": name,
                "image": image,
                "artists": artists,
                "downloaded_songs": list(Song.lookup_song(name, artists))
            })

        return {
            "limit": results["limit"],
            "offset": results["offset"],
            "total": results["total"],
            "songs": songs
        }
