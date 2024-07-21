// RandomSongSelector.js
import './RandomSongSelector.css';
import React, {useEffect, useRef, useState} from "react";
import SongPlayButton from "./SongPlayButton";
import RadioButton from "./RadioButton";
import {getRandomSong} from "../helpers";

const RandomSongSelector = ({
                                currentlyPlayingSong,
                                setSelectedSong,
                                globalWishlist
                            }) => {
    const [scope, setScope] = useState("all");
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [nextSong, setNextSong] = useState({});
    const [randomCount, setRandomCount] = useState(1);

    const coverListRef = useRef(null);

    // TODO: currently the random covers change everytime any State changes

    const getRandomCoverCount = () => {
        return Math.floor(Math.random() * 20) + 40;
    };


    const weightedWishes = [];
    Object.values(globalWishlist).forEach(wish => {
        for (let i = 0; i < wish.count; i++) {
            weightedWishes.push(wish);
        }
    });

    const getRandomWish = () => {
        const wishes = Object.values(globalWishlist);
        return wishes[Math.floor(Math.random() * wishes.length)];
    };

    const getRandomWeightedWish = () => {
        return weightedWishes[Math.floor(Math.random() * weightedWishes.length)];
    };

    const getRandomCoverUrl = index => {
        switch (scope) {
            case "all":
                return `url('/api/songs/random/cover?i=${new Date().getTime()}-${index}')`;
            case "wishlist":
                return `url('/api/songs/${getRandomWish().song.id}/cover')`;
            case "wishlistWeighted":
                return `url('/api/songs/${getRandomWeightedWish().song.id}/cover')`;
        }
    };

    const getSong = callback => {
        switch (scope) {
            case "all":
                getRandomSong(callback);
                break;
            case "wishlist":
                callback(getRandomWish().song);
                break;
            case "wishlistWeighted":
                callback(getRandomWeightedWish().song);
                break;
        }
    };

    const spin = async (first = false) => {
        getSong(song => {
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
                if (!first) {
                    setCurrentSong(nextSong);
                }
                setNextSong(song);
                setIsSpinning(false);
            };

            if (first) {
                finishSpin();
            } else {
                setTimeout(finishSpin, 5500);
            }
        });
    };

    useEffect(() => {
        spin(true);
    }, [scope]);

    const handleRadioChange = (event) => {
        setScope(event.target.value);
    };

    const handleSongClick = () => {
        if (currentSong.id !== undefined) {
            setSelectedSong(currentSong);
        }
    };

    return <div className={"random-song-selector" + (isSpinning ? " spinning" : "")}>
        <div className={"slot-machine"}>
            <div className={"header"}>
                <div className={"song-info"} onClick={handleSongClick}>
                    <label className={"title"}>{(currentSong.title !== undefined) ? currentSong.title : "Random Song"}</label>
                    <label className={"artist"}>{(currentSong.artist !== undefined) ? currentSong.artist : "Ultrastar Wingman"}</label>
                </div>
                {currentSong.id !== undefined && <div className={"song-controls"}>
                    <SongPlayButton song={currentSong} currentlyPlayingSong={currentlyPlayingSong}/>
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
                            style={{backgroundImage: getRandomCoverUrl(index)}}
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
                    <RadioButton disabled={isSpinning} text={"All Songs"} value={"all"} state={scope} setState={setScope}/>
                    <RadioButton disabled={isSpinning || Object.keys(globalWishlist).length === 0} text={"Wishlist"} value={"wishlist"} state={scope} setState={setScope}/>
                    <RadioButton disabled={isSpinning || Object.keys(globalWishlist).length === 0} text={"Wishlist (Weighted)"} value={"wishlistWeighted"} state={scope} setState={setScope}/>
                    <label className={"spin-button"} onClick={() => {
                        spin();
                    }}>SPIN</label>
                </div>
            </div>
        </div>
    </div>;
};

export default RandomSongSelector;
