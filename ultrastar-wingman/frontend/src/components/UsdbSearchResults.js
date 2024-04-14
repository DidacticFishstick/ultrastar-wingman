// UsdbSearchResults.js

import React from 'react';
import SongListItem from "./SongListItem";

const UsdbSearchResults = ({ songs }) => {
    if (songs.length === 0) {
        return <p>No songs found.</p>;
    }

    return (
        <ul className={"songs-list"}>
            {songs.map((song, index) => (
                <SongListItem song={song} coverUrl={`https://usdb.animux.de/data/cover/${song.id}.jpg`}/>
            ))}
        </ul>
    );
};

export default UsdbSearchResults;
