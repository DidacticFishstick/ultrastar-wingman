// UsdbSearchResults.js
import React from 'react';
import SongListItem from "./SongListItem";
import {HiDownload} from "react-icons/hi";
import {PulseLoader} from "react-spinners";
import {FaCheck} from "react-icons/fa";
import './UsdbSearchResults.css';
import {downloadFromUsdb, useDownloadQueue} from "../helpers";
import {MdError} from "react-icons/md";
import {IoTimerOutline} from "react-icons/io5";

const UsdbSearchResults = ({songs}) => {
    const [downloadQueue, setDownloadQueue] = useDownloadQueue();

    console.log(downloadQueue);
    console.log("4531" in downloadQueue)

    const getButton = (song) => {
        if (song.downloaded || downloadQueue.finished.includes(song.id)) return <FaCheck className={"finished"}/>;
        if (song.id in downloadQueue.failed) return <MdError className={"failed"}/>;
        if (downloadQueue.started.includes(song.id)) return <PulseLoader
            className={"started"}
            color="var(--highlight-blue-light)"
            size={9}
            aria-label="Loading Spinner"
            data-testid="loader"
        />;

        if (downloadQueue.queued.includes(song.id)) return <IoTimerOutline className={"queued"}/>;
        return <HiDownload className={"download-button"}/>;
    }

    return (
        <ul className={"songs-list usdb-list"}>
            {songs.map((song, index) => (
                // TODO: onClick info
                <SongListItem
                    song={song}
                    coverUrl={`https://usdb.animux.de/data/cover/${song.id}.jpg`}
                    button={getButton(song)}
                    onButton={(e) => {
                        if (song.downloaded || downloadQueue.finished.includes(song.id)) {
                        } else if (song.id in downloadQueue.failed) {
                            // TODO: custom modal
                            if (window.confirm(`FAILED TO DOWNLOAD - TRY AGAIN?\n--------------------------------\n${downloadQueue.failed[song.id]}\n--------------------------------\nFAILED TO DOWNLOAD - TRY AGAIN?`)) {
                                downloadFromUsdb(song.id)
                            }
                        } else if (downloadQueue.started.includes(song.id)) {
                        } else if (downloadQueue.queued.includes(song.id)) {
                        } else {
                            downloadFromUsdb(song.id)
                        }
                    }}
                />
            ))}
        </ul>
    );
};

export default UsdbSearchResults;
