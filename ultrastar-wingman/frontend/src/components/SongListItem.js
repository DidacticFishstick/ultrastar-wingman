// Song.js
import React, { useState } from 'react';
import './SongListItem.css';

function SongListItem({song, onClick}) {

    return (
        <li key={song.id} className="song-list-item" onClick={onClick}>
            <div className="cover" style={{backgroundImage: `url('/api/songs/${song.id}/cover')`}}>
            </div>
            <div className="details">
                <div className="title">{song.title}</div>
                <div className="artist">{song.artist}</div>
            </div>
        </li>
    );
}

export default SongListItem;
