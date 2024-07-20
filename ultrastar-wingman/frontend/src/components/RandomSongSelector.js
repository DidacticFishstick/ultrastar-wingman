// RandomSongSelector.js
import './RandomSongSelector.css';
import React, {useEffect, useRef, useState} from "react";
import {SongsApi} from "../api/src";
import SongPlayButton from "./SongPlayButton";
import SongDetailsModal from "./SongDetailsModal";
import RadioButton from "./RadioButton";

const RandomSongSelector = () => {
    const [scope, setScope] = useState("all");
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [nextSong, setNextSong] = useState({});
    const [randomCount, setRandomCount] = useState(1);

    const [selectedSong, setSelectedSong] = useState(null);

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
                if (!first) {
                    setIsSpinning(true);
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
                    setIsSpinning(false);
                };

                if (first) {
                    finishSpin();
                } else {
                    setTimeout(finishSpin, 5500);
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

    const handleSongClick = () => {
        if (currentSong.id !== undefined) {
            setSelectedSong(currentSong);
        }
    };

    const closeModal = () => {
        setSelectedSong(null);
    };

    // TODO: favorites and wishlist info from parent
    return <div className={"random-song-selector" + (isSpinning ? " spinning" : "")}>
        {error && <h1>{error}</h1>}
        <div className={"slot-machine"}>
            <div className={"header"}>
                <div className={"song-info"} onClick={handleSongClick}>
                    <label className={"title"}>{(currentSong.title !== undefined) ? currentSong.title : "Random Song"}</label>
                    <label className={"artist"}>{(currentSong.artist !== undefined) ? currentSong.artist : "Ultrastar Wingman"}</label>
                </div>
                {currentSong.id !== undefined && <div className={"song-controls"}>
                    <SongPlayButton song={currentSong}/>
                </div>}
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
                {/*TODO: functionality*/}
                <div className={"random-controls"}>
                    <RadioButton text={"All Songs"} value={"all"} state={scope} setState={setScope}/>
                    <RadioButton text={"Wishlist"} value={"wishlist"} state={scope} setState={setScope}/>
                    <RadioButton text={"Wishlist (Weighted)"} value={"wishlist-weighted"} state={scope} setState={setScope}/>
                    <label className={"spin-button"} onClick={() => {
                        spin();
                    }}>SPIN</label>
                </div>
            </div>
        </div>
        {selectedSong && <SongDetailsModal song={selectedSong} onClose={closeModal}/>}
    </div>;
};

export default RandomSongSelector;
