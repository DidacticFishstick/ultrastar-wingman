// components/SpotifyCallback.js

import React from 'react';
import {useLocation} from 'react-router-dom';
import './SpotifyCallback.css';
import {spotifyAuthorize} from "../helpers";

const SpotifyCallback = () => {
    const query = new URLSearchParams(useLocation().search);
    const code = query.get('code');

    spotifyAuthorize(code, data => {
        window.location.href = '/user'; // Redirect to another site
    });

    // TODO: error handling
    return <div>Attempting Spotify Authorization...</div>;
};

export default SpotifyCallback;
