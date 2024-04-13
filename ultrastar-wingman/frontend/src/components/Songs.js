// Songs.js
import React, {useState, useEffect} from 'react';
import {SongsApi} from "../api/src";
import SongListItem from "./SongListItem";
import SongDetailsModal from "./SongDetailsModal";
import './Songs.css';

function Songs() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);
    const api = new SongsApi();

    useEffect(() => {
        const fetchSongs = async () => {
            const response = await api.apiSongsApiSongsGet();
            const xhr = response.xhr;

            console.log(xhr);

            if (xhr.status >= 200 && xhr.status < 300) {

                xhr.onload = () => {
                    console.log(xhr);

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

    console.log(songs)

    // Filter songs based on search term
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="songs-list">
            <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
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
