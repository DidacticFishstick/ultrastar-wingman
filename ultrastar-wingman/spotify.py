from typing import Optional

import spotipy

import config

from spotipy.oauth2 import SpotifyOAuth


def _create_auth_manager():
    return SpotifyOAuth(
        client_id=config.spotify_client_id,
        client_secret=config.spotify_client_secret,
        redirect_uri=f"{config.client_url.rstrip('/')}/spotify/callback",
        scope="user-library-read,playlist-read-private,playlist-read-collaborative"
    )


class SpotifyClient:
    """
    A spotify client for one user

    To use this, <config.client_url>/spotify/callback must be added as a Redirect URI in https://developer.spotify.com/dashboard
    """

    def __init__(self):
        # TODO: save the tokens to keep them even after restarts?
        self._auth_manager = _create_auth_manager()

        self._client: Optional[spotipy.Spotify] = None

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

        self._auth_manager = _create_auth_manager()

        self._client = None

    @property
    def client(self) -> Optional[spotipy.Spotify]:
        """
        The spotify client
        None before successful authorization

        :return: The client
        """

        return self._client