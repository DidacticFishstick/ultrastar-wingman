// Songs.js
import React, {useState, useEffect, useRef} from 'react';
import {NavLink} from 'react-router-dom';
import {SongsApi} from "../api/src";
import SongListItem from "./SongListItem";
import SongDetailsModal from "./SongDetailsModal";
import './Songs.css';
import Tile from "./Tile";
import Spinner from "./Spinner";
import Input from "./Input";
import {FaSearch} from "react-icons/fa";

function Songs() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api = new SongsApi();

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            setError(null);

            api.apiSongsApiSongsGet((error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                    setError(error + " - " + response.text);
                } else {
                    setSongs(data.songs);
                    setLoading(false);
                }
            });
        };

        fetchSongs();
    }, []);

    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    const closeModal = () => {
        setSelectedSong(null);
    };

    // Filter songs based on search term
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2>Downloaded Songs</h2>
            <div ref={inputRef} className="songs-search">
                <Input type="text" placeholder="Search downloaded songs" icon={<FaSearch/>} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onEnter={() => {}} onFocus={() => {
                    setTimeout(() => {
                        inputRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }, 50);
                }}/>
            </div>
            {loading && <Spinner/>}
            {error && <h1>{error}</h1>}
            <ul className={"songs-list"}>
                {filteredSongs.map(song => (
                    <SongListItem song={song} coverUrl={`/api/songs/${song.id}/cover`} onClick={() => handleSongClick(song)}/>
                ))}
            </ul>
            {selectedSong && <SongDetailsModal song={selectedSong} onClose={closeModal}/>}
        </div>
    );
}

export default Songs;
