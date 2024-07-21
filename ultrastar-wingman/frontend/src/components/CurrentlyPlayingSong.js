// CurrentlyPlayingSong.js
import './CurrentlyPlayingSong.css';
import React from "react";

function CurrentlyPlayingSong({
                                  currentlyPlayingSong,
                                  setSelectedSong
                              }) {
    const select = () => setSelectedSong(currentlyPlayingSong);

    if (currentlyPlayingSong !== null) {
        return <div className={"currently-playing-song"}>
            <div className={"cover"} onClick={select} style={{backgroundImage: `url('/api/songs/${currentlyPlayingSong.id}/cover')`}}></div>
            <label className={"title"} onClick={select}>{currentlyPlayingSong.title}</label>
            <label className={"artist"} onClick={select}>{currentlyPlayingSong.artist}</label>
        </div>;
    } else
        return <div className={"currently-playing-song"}>
            <div className={"cover"}></div>
            <label className={"title"}>No Active Song</label>
            <label className={"artist"}>Select any song and press play</label>
        </div>;
}

export default CurrentlyPlayingSong;
