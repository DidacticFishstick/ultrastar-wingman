// UsdbSearchResults.js
import React, {useState} from 'react';
import SongListItem from "./SongListItem";
import {HiDownload} from "react-icons/hi";
import {PulseLoader} from "react-spinners";
import {FaCheck} from "react-icons/fa";
import './UsdbSearchResults.css';

const download = (song) => {
    console.log("download!!!")
};

const UsdbSearchResults = ({songs}) => {
    return (
        <ul className={"songs-list usdb-list"}>
            {songs.map((song, index) => (
                // TODO: onClick info
                <SongListItem
                    song={song}
                    coverUrl={`https://usdb.animux.de/data/cover/${song.id}.jpg`}
                    button={
                        <div>
                            <span className={"usdb-state download-button"}>
                                <HiDownload/>
                            </span>
                            <span className={"usdb-state downloading-button"}>
                                <PulseLoader
                                    color="var(--highlight-blue-light)"
                                    size={9}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </span>
                            <span className={"usdb-state downloaded-button"}>
                                <FaCheck/>
                            </span>
                        </div>
                    }
                    onButton={(e) => {
                        e.currentTarget.classList.add("downloading");

                        download(song);
                    }}
                />
            ))}
        </ul>
    );
};

export default UsdbSearchResults;
