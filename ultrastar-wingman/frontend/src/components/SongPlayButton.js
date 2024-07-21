// SongPlayButton.js
import './SongPlayButton.css';
import React from "react";
import {FaPlay, FaStop} from "react-icons/fa";
import {killUsdb, playSong} from "../helpers";

const SongPlayButton = ({
                            song,
                            currentlyPlayingSong,
                            className,
                            props
                        }) => {
    if (currentlyPlayingSong?.id === song.id) {
        return <FaStop className={"song-play-button stop " + className} onClick={() => killUsdb()} title={"Stop song"} {...props}/>;
    } else {
        return <FaPlay className={"song-play-button play " + className} onClick={() => playSong(song)} title={"Start song"} {...props}/>;
    }
};

export default SongPlayButton;
