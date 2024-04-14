// UsdbList.js
import React, {useRef, useState} from 'react';
import UsdbSearchResults from './UsdbSearchResults';
import {PiTextTBold} from "react-icons/pi";
import {IoPerson} from "react-icons/io5";
import './UsdbList.css';
import Spinner from "./Spinner";
import Input from "./Input";
import {NavLink} from "react-router-dom";
import {USDBApi} from "../api/src";

function UsdbList() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [order, setOrder] = useState('ascending');
    const [songs, setSongs] = useState([]);
    const [showInfo, setShowInfo] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const inputBoxRef = useRef();

    const api = new USDBApi();

    const fetchSongs = async () => {
        try {
            setLoading(true);
            setError(null);

            // TODO: parameters
            // TODO: onscroll paging
            const response = await api.apiUsdbSongsApiUsdbSongsGet();

            const xhr = response.xhr;

            if (xhr.status >= 200 && xhr.status < 300) {

                xhr.onload = () => {
                    const data = JSON.parse(xhr.response);

                    setSongs(data.songs);

                    // wait a little before scrolling, to make sure the content has loaded
                    setTimeout(() => {
                        inputBoxRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }, 50);
                };
            } else {
                throw new Error('Failed to fetch songs with status: ' + xhr.status);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"usdb-list"}>
            <h1>usdb.animux.de</h1>
            <p>
                usdb.animux.de is an extensive database of lyric files for UltraStar Deluxe.
                Search USDB below or switch to the default view to search the site directly.
            </p>
            <p>
                Ultrastar Wingman proxies usdb.animux.de to enable every client to browse and download songs without the need for individual accounts.
                It also adds a download button to the default USDB site when accessed through Ultrastar Wingman.
            </p>
            <h2>Search USDB</h2>
            <div ref={inputBoxRef} className={"usdb-search"}>
                <Input type="text" placeholder="Song Title" icon={<PiTextTBold/>} searchTerm={title} setSearchTerm={setTitle}/>
                <Input type="text" placeholder="Artist" icon={<IoPerson/>} searchTerm={artist} setSearchTerm={setArtist}/>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <button onClick={fetchSongs}>Search</button>

                <NavLink to="/usdb">switch to the default USDB view</NavLink>
            </div>
            {loading && <Spinner/>}
            {error && <h1>{error}</h1>}
            <UsdbSearchResults songs={songs}/>
        </div>
    );
}

export default UsdbList;
