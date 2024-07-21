// CurrentlyPlayingSong.js
import 'react-toastify/dist/ReactToastify.css';
import './CurrentlyPlayingSong.css';
import React from "react";

function CurrentlyPlayingSong({
                                  currentlyPlayingSong,
                                  setSelectedSong
                              }) {
    const select = () => setSelectedSong(currentlyPlayingSong);

    if (currentlyPlayingSong !== null) {
        return <div className={"currently-playing-song"}>
            <h1>Currently Playing</h1>
            <div className={"cover"} onClick={select} style={{backgroundImage: `url('/api/songs/${currentlyPlayingSong.id}/cover')`}}></div>
            <label className={"title"} onClick={select}>{currentlyPlayingSong.title}</label>
            <label className={"artist"} onClick={select}>{currentlyPlayingSong.artist}</label>
        </div>;
    } else
        return <div className={"currently-playing-song"}>
            <h1>Currently Playing</h1>
            <div className={"cover"}></div>
            <label className={"title"}>No Active Song</label>
            <label className={"artist"}></label>
        </div>;
}

export default CurrentlyPlayingSong;
