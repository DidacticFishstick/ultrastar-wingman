// Songs.js
import React, {useState, useEffect, useRef} from 'react';
import {FaSearch} from "react-icons/fa";
import {GiCancel} from "react-icons/gi";
import {SongsApi} from "../api/src";
import SongListItem from "./SongListItem";
import SongDetailsModal from "./SongDetailsModal";
import './Songs.css';
import {VscSettings} from "react-icons/vsc";
import Tile from "./Tile";
import {TfiReload} from "react-icons/tfi";

function Songs() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);
    const api = new SongsApi();

    useEffect(() => {
        const fetchSongs = async () => {
            const response = await api.apiSongsApiSongsGet();
            const xhr = response.xhr;

            if (xhr.status >= 200 && xhr.status < 300) {

                xhr.onload = () => {
                    const data = JSON.parse(xhr.response);

                    setSongs(data.songs);
                };
            } else {
                console.log('Failed to fetch songs with status: ' + xhr.status);
            }
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
        <div className="songs-list">
            <h2>Download New Songs</h2>
            <div className="tile-container slim">
                <Tile className={"icon-and-text clickable"}>
                    <VscSettings/>
                    <label>Settings</label>
                </Tile>
                <Tile className={"icon-and-text clickable"}>
                    <TfiReload/>
                    <label>Restart USDX</label>
                </Tile>
                <Tile className={"icon-and-text clickable"}>
                    <TfiReload/>
                    <label>Restart USDX</label>
                </Tile>
            </div>
            <h2>Downloaded Songs</h2>
            <div className="songs-search">
                <div>
                    {/*TODO: scroll on focus does not work on mobile*/}
                    <span className={"search"}>
                        <FaSearch/>
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search downloaded songs"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onFocus={() => inputRef.current.scrollIntoView({behavior: "smooth", block: "start"})}
                    />
                    {searchTerm && <span className={"cancel"} onClick={() => {
                        inputRef.current.value = '';
                        setSearchTerm('');
                    }}>
                        <GiCancel/>
                    </span>}
                </div>
            </div>
            <ul>
                {filteredSongs.map(song => (
                    <SongListItem song={song} onClick={() => handleSongClick(song)}/>
                ))}
            </ul>
            {selectedSong && <SongDetailsModal song={selectedSong} onClose={closeModal}/>}
        </div>
    );
}

export default Songs;
