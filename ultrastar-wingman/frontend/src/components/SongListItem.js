// Song.js
import React from 'react';
import StarRating from "./StarRating";
import './SongListItem.css';

function SongListItem({song, onClick, coverUrl, button, onButton}) {
    return (
        <li key={song.id} className="song-list-item" onClick={onClick}>
            <div className="cover" style={{backgroundImage: `url('${coverUrl}')`}}>
            </div>
            <div className="details">
                <div className="title">{song.title}</div>
                <div className="artist">{song.rating !== undefined && <StarRating rating={song.rating}/>} <span>{song.artist}</span></div>
            </div>
            <div className={song.downloaded ? "song-button downloaded" : "song-button"} onClick={(e) => {
                onButton(e);
                e.stopPropagation();
            }}>
                {button}
            </div>
        </li>
    );
}

export default SongListItem;
