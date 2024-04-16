// SongDetailsModal.js
import './SongDetailsModal.css';
import React from "react";

const SongDetailsModal = ({song, onClose}) => {
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

    return (
        <div className="modal-backdrop" onClick={close}>
            <div className="modal-content" onClick={close}>
                <img src={`/api/songs/${song.id}/cover`} height={"250px"} alt={`${song.title} cover`}/>
                <h1>{song.title}</h1>
                <h2>{song.artist}</h2>
                <audio controls>
                    <source src={`/api/songs/${song.id}/mp3`} type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
                <label className={"directory"}>{song.directory}</label>
                <span className={"close"} onClick={onClose}>Close</span>
            </div>
        </div>
    );
};

export default SongDetailsModal;
