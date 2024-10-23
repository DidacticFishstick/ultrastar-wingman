// components/SpotifyAccount.js

import React from 'react';
import './SpotifyAccount.css';
import {spotifyAuthorizeRedirect, spotifyLogout, useSpotifyMe} from "../helpers";
import {IoIosLogOut} from "react-icons/io";

const SpotifyAccount = () => {
    const [spotifyMe, setSpotifyMe] = useSpotifyMe();

    if (spotifyMe === null) {
        return <div className={"spotify-account"}></div>;
    } else if (spotifyMe.name === undefined) {
        return <div className={"spotify-account"} onClick={spotifyAuthorizeRedirect}>
            <span className={"logo"}></span>
            <label>Connect Spotify Account</label>
        </div>;
    } else {
        return <div className={"spotify-account"}>
            <span className={"logo"}></span>
            <label className={"name"}>{spotifyMe.name}</label>
            <IoIosLogOut onClick={() => spotifyLogout(data => {
                setSpotifyMe({});
            })} />
        </div>;
    }
};

export default SpotifyAccount;
