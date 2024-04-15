// UsdbSearchResults.js
import React, {useState} from 'react';
import SongListItem from "./SongListItem";
import {HiDownload} from "react-icons/hi";
import {PulseLoader} from "react-spinners";
import {FaCheck} from "react-icons/fa";
import {USDBApi} from "../api/src";
import './UsdbSearchResults.css';

const UsdbSearchResults = ({songs}) => {
    const api = new USDBApi();

    // TODO: set button to downloaded triggered by ws

    const download = async (song, button) => {
        api.apiUsdbDownloadApiUsdbDownloadPost(JSON.stringify({id: song.id}), (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                button.removeClass("downloading");
            }
        });
    };

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
                        if (e.currentTarget.classList.contains("downloading") || e.currentTarget.classList.contains("downloaded")) return;

                        e.currentTarget.classList.add("downloading");
                        download(song, e.currentTarget);
                    }}
                />
            ))}
        </ul>
    );
};

export default UsdbSearchResults;
