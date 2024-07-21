// Song.js
import React from 'react';
import StarRating from "./StarRating";
import './SongListItem.css';
import {FaCheck} from "react-icons/fa";
import {IoMdHeart} from "react-icons/io";

function SongListItem({
                          song,
                          coverUrl,
                          onClick,
                          button,
                          onButton,
                          globalWishlist,
                          clientWishList,
                          favoriteIds
                      }) {
    return (
        <li key={song.id} className="song-list-item" onClick={onClick}>
            <div className="cover" style={{backgroundImage: `url('${coverUrl}')`}}>
            </div>
            <div className="details">
                <div className="title" title={song.title}>
                    {globalWishlist?.hasOwnProperty(song.id) &&
                        <span className={"wished-count"}>{`${globalWishlist[song.id].count}x`}</span>
                    }
                    <span className={"text"}>{song.title}</span>
                    {favoriteIds?.includes(song.id) &&
                        <IoMdHeart className={"heart"}/>
                    }
                    {clientWishList?.hasOwnProperty(song.id) &&
                        <FaCheck className={"mark"}/>
                    }
                </div>
                <div className="artist" title={song.artist}>
                    {song.rating !== undefined && <StarRating rating={song.rating}/>}
                    <span className={"text"}>{song.artist}</span>
                </div>
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
