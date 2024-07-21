// SongPlayButton.js
import './SongPlayButton.css';
import React, {useRef} from "react";
import {FaPlay, FaStop} from "react-icons/fa";
import {SongsApi, UltraStarDeluxeApi} from "../api/src";

const SongPlayButton = ({song, props}) => {
    // TODO: change back to not started when the song changes
    const buttonRef = useRef(null);

    const songsApi = new SongsApi();
    const usdxApi = new UltraStarDeluxeApi();

    const play = (force = false) => {
        // TODO: helpers.js
        songsApi.apiSingSongApiSongsSongIdSingPost(song.id, {force: force}, (error, data, response) => {
            if (error) {
                if (response.status === 409) {
                    if (window.confirm("Another song is already playing. Abort the current song and start this one?")) {
                        play(true);
                    }
                } else {
                    console.error(error, response.text);
                    alert(response.text);
                }
            } else {
                // successfully started
                buttonRef.current.classList.add("playing");
            }
        });
    }

    const onPlay = (e) => {
        play();
    };

    const onStop = (e) => {
        if (window.confirm("Do you really wish to abort the current song?")) {
            usdxApi.apiUsdxKillApiUsdxKillPost((error, data, response) => {
                // TODO: helpers.js
                if (error) {
                    console.error(error, response.text);
                    alert(response.text);
                } else {
                    // successfully killed
                    buttonRef.current.classList.remove("playing");
                }
            });
        }
    };

    return <div className={"song-play-button"} ref={buttonRef} {...props}>
        <FaPlay className={"play"} onClick={onPlay} title={"Start song"}/>
        <FaStop className={"stop"} onClick={onStop} title={"Stop song"}/>
    </div>;
};

export default SongPlayButton;
