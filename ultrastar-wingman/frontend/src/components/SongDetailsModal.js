// SongDetailsModal.js
import './SongDetailsModal.css';
import React, {useRef} from "react";
import {FaPlay, FaStop} from "react-icons/fa";
import {SongsApi, UltraStarDeluxeApi} from "../api/src";
import {IoMdClose} from "react-icons/io";

const SongDetailsModal = ({song, onClose}) => {
    const modalRef = useRef(null);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const close = (e) => {
        if (e.target !== e.currentTarget) {
            e.stopPropagation();
            return;
        }
        onClose();
    };

    const songsApi = new SongsApi();
    const usdxApi = new UltraStarDeluxeApi();

    const play = (force=false) => {
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
                modalRef.current.classList.add("playing");
            }
        });
    }

    const onPlay = (e) => {
        play();
    };

    const onStop = (e) => {
        if (window.confirm("Do you really wish to abort the current song?")) {
            usdxApi.apiUsdxKillApiUsdxKillPost((error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                    alert(response.text);
                } else {
                    // successfully killed
                    modalRef.current.classList.remove("playing");
                }
            });
        }
    };

    return (
        <div className="modal-backdrop" onClick={close}>
            <IoMdClose className={"close"}/>
            <div className="modal-content" onClick={close} ref={modalRef}>
                <img src={`/api/songs/${song.id}/cover`} height={"250px"} alt={`${song.title} cover`}/>
                <h1>{song.title}</h1>
                <h2>{song.artist}</h2>
                <audio controls>
                    <source src={`/api/songs/${song.id}/mp3`} type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
                <label className={"directory"}>{song.directory}</label>
                {/*TODO: play button*/}
                <span className={"play"} onClick={onPlay}><FaPlay/></span>
                <span className={"stop"} onClick={onStop}><FaStop/></span>
            </div>
        </div>
    );
};

export default SongDetailsModal;
