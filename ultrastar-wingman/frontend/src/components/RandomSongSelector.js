// RandomSongSelector.js
import './RandomSongSelector.css';
import React, {useEffect, useRef, useState} from "react";
import {SongsApi} from "../api/src";
import SongPlayButton from "./SongPlayButton";

const RandomSongSelector = () => {
    const [scope, setScope] = useState("all");
    const [currentSong, setCurrentSong] = useState({});
    const [nextSong, setNextSong] = useState({});
    const [randomCount, setRandomCount] = useState(1);

    const [error, setError] = useState(null);

    const coverListRef = useRef(null);

    const songsApi = new SongsApi();

    const getRandomCoverCount = () => {
        return Math.floor(Math.random() * 20) + 40;
    };

    // TODO: select: all songs, wishlist, wishlist (weighted)

    const spin = async (first = false) => {
        setError(null);

        songsApi.apiGetSongByIdApiSongsSongIdGet("random", (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                setError(error + " - " + response.text);
            } else {
                // skip animation on first load
                if (!first) {
                    coverListRef.current.classList.add("spinning");
                    coverListRef.current.style.top = "0%";
                }

                const finishSpin = () => {
                    const r = getRandomCoverCount();
                    coverListRef.current.classList.remove("spinning");
                    coverListRef.current.style.top = ((r + 1) * -100) + "%";

                    setRandomCount(r);
                    setCurrentSong(nextSong);
                    setNextSong(data);
                };

                if (first) {
                    finishSpin();
                } else {
                    setTimeout(finishSpin, 5050);
                }
            }
        });
    };

    useEffect(() => {
        spin(true);
    }, []);

    const handleRadioChange = (event) => {
        setScope(event.target.value);
    };

    // TODO: favorites and wishlist info from parent
    // TODO: onclick show details
    return <div className={"random-song-selector"}>
        <h1>Random Song Selector</h1>
        {error && <h1>{error}</h1>}
        <div className={"slot-machine"}>
            <div className={"side left"}>
                <div className={"song-info"}>
                    <label className={"title"}>{(currentSong.title !== undefined) ? currentSong.title : "Random Song"}</label>
                    <label className={"artist"}>{(currentSong.artist !== undefined) ? currentSong.artist : "Ultrastar Wingman"}</label>
                </div>
                <div className={"spacer"}></div>
                <div className={"song-controls"}>
                    <SongPlayButton/>
                </div>
            </div>
            <div className={"cover"}>
            <div ref={coverListRef} className={"cover-list"}>
                    <div
                        key={-1}
                        className={"sub-cover next"}
                        style={{backgroundImage: `url(/api/songs/${nextSong.id}/cover)`}}
                    ></div>
                    {Array.from({length: randomCount}, (_, index) => (
                        <div
                            key={index}
                            className={"sub-cover random"}
                            style={{backgroundImage: `url(/api/songs/random/cover?i=${new Date().getTime()}-${index})`}}
                        ></div>
                    ))}
                    <div
                        key={randomCount}
                        className={"sub-cover current"}
                        style={{...((currentSong.id !== undefined) ? {backgroundImage: `url(/api/songs/${currentSong.id}/cover)`} : {})}}
                    ></div>
                </div>
                <div className={"select-line"}></div>
            </div>
            <div className={"side right"}>
                <div className={"random-controls"}>
                    <label>
                        <input
                            type="radio"
                            value="all"
                            checked={scope === "all"}
                            onChange={handleRadioChange}
                        />
                        <span className={"text"}>All Songs</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="wishlist"
                            checked={scope === "wishlist"}
                            onChange={handleRadioChange}
                        />
                        <span className={"text"}>Wishlist</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="wishlist-weighted"
                            checked={scope === "wishlist-weighted"}
                            onChange={handleRadioChange}
                        />
                        <span className={"text"}>Wishlist (weighted)</span>
                    </label>
                    <div className={"spacer"}></div>
                    <label className={"spin-button"} onClick={() => {
                        spin();
                    }}>SPIN</label>
                </div>
            </div>
        </div>
    </div>;
};

export default RandomSongSelector;
