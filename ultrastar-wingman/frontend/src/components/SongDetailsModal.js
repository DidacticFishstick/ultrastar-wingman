// SongDetailsModal.js
import './SongDetailsModal.css';
import React from "react";

const SongDetailsModal = ({song, onClose}) => {
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => {
                e.stopPropagation();
            }}>
                <h2>{song.title} - {song.artist}</h2>
                <img src={`/api/songs/${song.id}/cover`} alt={`${song.title} cover`}/>
                <p>{song.directory}</p>
                <p>Duration: {song.duration.toFixed(2)} seconds</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SongDetailsModal;
