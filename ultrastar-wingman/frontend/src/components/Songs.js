// Songs.js
import React, {useState, useEffect, useRef} from 'react';
import {FaSearch} from "react-icons/fa";
import {BsThreeDots} from "react-icons/bs";
import {NavLink} from 'react-router-dom';
import SongListItem from "./SongListItem";
import './Songs.css';
import Tile from "./Tile";
import Spinner from "./Spinner";
import Input from "./Input";
import {useClientWishlist, useCurrentlyPlayingSong, useFavoriteIds, useSongs} from "../helpers";
import SongDetailsModal from "./SongDetailsModal";

function Songs() {
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useCurrentlyPlayingSong();

    const [songs, setSongs] = useSongs();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);

    const [clientWishlist, setClientWishlist] = useClientWishlist();
    const [favoriteIds, setFavoriteIds] = useFavoriteIds();

    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    const sortedSongs = Object.values(songs).sort((a, b) => {
        if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
        if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
    });

    // Filter songs based on search term
    const filteredSongs = sortedSongs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.id === searchTerm
    );

    const inputRef = useRef();

    return (
        <div className="songs-page">
            <h2>Get New Songs</h2>
            <div className="download-options tile-container slim">
                <NavLink to="/UsdbList">
                    <Tile className={"usdb clickable"}>
                        <label>USDB</label>
                    </Tile>
                </NavLink>
                <NavLink to="/ultraSinger">
                    <Tile className={"ultra-singer clickable"}>
                        <label>UltraSinger</label>
                    </Tile>
                </NavLink>
            </div>
            <h2>{`Downloaded Songs (${Object.keys(songs).length})`}</h2>
            <div ref={inputRef} className="songs-search">
                <Input type="text" placeholder="Search downloaded songs" icon={<FaSearch/>} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onEnter={() => {
                }} onFocus={() => {
                    setTimeout(() => {
                        inputRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }, 50);
                }}/>
            </div>
            {(songs === {}) && <Spinner/>}
            <ul className={"songs-list"}>
                {filteredSongs.map(song => (
                    <SongListItem
                        song={song}
                        coverUrl={`/api/songs/${song.id}/cover`}
                        onClick={() => handleSongClick(song)}
                        button={<BsThreeDots/>}
                        onButton={() => handleSongClick(song)}
                        clientWishList={clientWishlist}
                        favoriteIds={favoriteIds}
                    />
                ))}
            </ul>
            {selectedSong &&
                <SongDetailsModal
                    song={selectedSong}
                    onClose={() => setSelectedSong(null)}
                    currentlyPlayingSong={currentlyPlayingSong}
                    clientWishlist={clientWishlist}
                    setClientWishlist={setClientWishlist}
                    favoriteIds={favoriteIds}
                    setFavoriteIds={setFavoriteIds}
                />
            }
        </div>
    );
}

export default Songs;
