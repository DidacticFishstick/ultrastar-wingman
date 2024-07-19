// RandomSongSelector.js
import './RandomSongSelector.css';
import React, {useEffect, useRef, useState} from "react";
import FullScreenModal from "./FullScreenModal";
import {SongsApi} from "../api/src";
import Spinner from "./Spinner";

const RandomSongSelector = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [nextSong, setNextSong] = useState({});
    const [randomCount, setRandomCount] = useState(1);

    const [error, setError] = useState(null);

    const coverListRef = useRef(null);

    const songsApi = new SongsApi();

    const getRandomCoverCount = () => {
        return Math.floor(Math.random() * 20) + 40;
    };

    const spin = async (first = false) => {
        setError(null);

        songsApi.apiGetSongByIdApiSongsSongIdGet("random", (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                setError(error + " - " + response.text);
            } else {
                // skip animation on first load
                console.log(first);
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

    // TODO: favorites and wishlist info from parent
    return <FullScreenModal className={"random-song-selector"}>
        <h1>Random Song Selector</h1>
        {error && <h1>{error}</h1>}
        <div className={"slot-machine"}>
            <div className={"left"}></div>
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
            </div>
            <div className={"right"}></div>
            <label className={"spin-button"} onClick={() => {
                spin();
            }}>SPIN</label>
        </div>
    </FullScreenModal>;
};

export default RandomSongSelector;
