// Song.js
import React, { useState } from 'react';
import './SongListItem.css';

function SongListItem({song, onClick}) {
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <li key={song.id} className="song-list-item" onClick={onClick}>
            <div className="song-cover">
                <img src={`/api/songs/${song.id}/cover`} alt={`${song.title} cover`} />
            </div>
            <div className="song-details">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <p>Duration: {formatDuration(song.duration)}</p>
            </div>
        </li>
    );
}

export default SongListItem;
