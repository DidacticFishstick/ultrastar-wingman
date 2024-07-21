// UsdbList.js
import React, {useEffect, useRef, useState} from 'react';
import UsdbSearchResults from './UsdbSearchResults';
import {PiTextTBold} from "react-icons/pi";
import {IoPerson} from "react-icons/io5";
import {TbArrowsSort} from "react-icons/tb";
import {NavLink} from "react-router-dom";
import {USDBApi} from "../api/src";
import Spinner from "./Spinner";
import Input from "./Input";
import Button from "./Button";
import './UsdbList.css';

function UsdbList() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [order, setOrder] = useState('rating-desc');
    const [songs, setSongs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const inputBoxRef = useRef();

    const api = new USDBApi();

    const fetchSongs = async (new_fetch) => {
        if (!new_fetch && !hasMore) return;
        if (loading) return;

        if (new_fetch) setSongs([]);
        setLoading(true);
        setError(null);

        // TODO: helpers.js
        api.apiUsdbSongsApiUsdbSongsGet({
            artist: artist,
            title: title,
            order: order.split("-")[0],
            ud: order.split("-")[1],
            page: new_fetch ? 1 : currentPage + 1
        }, (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                setError(error + " - " + response.text);
            } else {
                if (new_fetch) {
                    setSongs(data.songs);
                    setCurrentPage(1);
                    setHasMore(data.paging.current < data.paging.pages);

                    // wait a little before scrolling, to make sure the content has loaded
                    setTimeout(() => {
                        inputBoxRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }, 50);
                } else {
                    setSongs(prevSongs => [...prevSongs, ...data.songs]);
                    setCurrentPage(data.paging.current);
                    setHasMore(data.paging.current < data.paging.pages);
                }

                setLoading(false);
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            // small threshold due to some problems on pc
            if (Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight) > 1) return;
            fetchSongs(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage, hasMore, artist, title, order]);

    return (
        <div className={"usdb-list"}>
            <h1>usdb.animux.de</h1>
            <p>
                usdb.animux.de is an extensive database of lyric files for UltraStar Deluxe.
                Search USDB below or switch to the default view to search the site directly.
            </p>
            <p>
                Ultrastar Wingman proxies usdb.animux.de to enable every client to browse and download songs without the need for individual accounts.
            </p>
            <NavLink className={"usdb-link"} to="/usdb">Switch to the default USDB view</NavLink>
            <h2>Search USDB</h2>
            <div ref={inputBoxRef} className={"usdb-search"}>
                <div className={"combined-input"}>
                    <Input type="text" placeholder="Song Title" icon={<PiTextTBold/>} searchTerm={title} setSearchTerm={setTitle} onEnter={() => fetchSongs(true)}/>
                    <Input type="text" placeholder="Artist" icon={<IoPerson/>} searchTerm={artist} setSearchTerm={setArtist} onEnter={() => fetchSongs(true)}/>
                    <div className={"input-field"}>
                    <span className={"search"}>
                        <TbArrowsSort/>
                    </span>
                        <select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="id-asc">Date - old to new</option>
                            <option value="id-desc">Date - new to old</option>
                            <option value="artist-asc">Artist - ascending</option>
                            <option value="artist-desc">Artist - descending</option>
                            <option value="title-asc">Titel - ascending</option>
                            <option value="title-desc">Titel - descending</option>
                            <option value="rating-desc">Rating - high to low</option>
                            <option value="rating-asc">Rating - low to high</option>
                            <option value="views-desc">Views - high to low</option>
                            <option value="views-asc">Views - low to high</option>
                        </select>
                    </div>
                </div>
                <Button text={"Search"} onClick={() => fetchSongs(true)}/>
            </div>
            {loading && songs.length === 0 && <div className={"top-spinner"}>
                <Spinner/>
            </div>}
            <UsdbSearchResults songs={songs}/>
            {error && <h1>{error}</h1>}
            {loading && songs.length !== 0 && <div className={"bottom-spinner"}>
                <Spinner/>
            </div>}
        </div>
    );
}

export default UsdbList;
