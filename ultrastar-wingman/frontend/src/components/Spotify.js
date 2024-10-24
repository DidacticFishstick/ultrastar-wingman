// components/Spotify.js
import React from 'react';
import './Spotify.css';
import {useSpotifyMe, useSpotifyPlaylists} from "../helpers";
import Spinner from "./Spinner";
import {NavLink} from "react-router-dom";

function Spotify() {
    const [spotifyMe, setSpotifyMe] = useSpotifyMe();
    const [spotifyPlaylists, setSpotifyPlaylists] = useSpotifyPlaylists();

    if (spotifyMe === null || spotifyPlaylists === null) {
        // still loading
        return (
            <div className="spotify-page">
                <h1>Spotify</h1>
                <Spinner/>
            </div>
        );
    } else if (Object.keys(spotifyMe).length === 0) {
        // not logged in
        return (
            <div className="spotify-page">
                <h1>Spotify</h1>
                <NavLink to="/user">Connect a spotify account to your user</NavLink>
            </div>
        );
    } else {
        // fully loaded
        return (
            <div className="spotify-page">
                <h1>Spotify</h1>

                <h2>Liked Songs</h2>
                {spotifyPlaylists.map(playlist => (
                    <h2>{playlist.name}</h2>
                ))}
            </div>
        );
    }

}

export default Spotify;
