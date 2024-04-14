// Song.js
import React, {useState} from 'react';
import {FaCheck} from "react-icons/fa";
import StarRating from "./StarRating";
import './SongListItem.css';

function SongListItem({song, onClick, coverUrl}) {
    return (
        <li key={song.id} className="song-list-item" onClick={onClick}>
            <div className="cover" style={{backgroundImage: `url('${coverUrl}')`}}>
            </div>
            <div className="details">
                <div className="title">{song.title} {song.downloaded && <span className={"mark"}><FaCheck/></span>}</div>
                <div className="artist">{song.rating !== undefined && <StarRating rating={song.rating}/>} <span>{song.artist}</span></div>
            </div>
        </li>
    );
}

export default SongListItem;
