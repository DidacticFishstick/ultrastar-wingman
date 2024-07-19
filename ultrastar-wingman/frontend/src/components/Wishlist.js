// Wishlist.js
import React, {useState, useEffect, useRef} from 'react';
import {FaSearch} from "react-icons/fa";
import {BsThreeDots} from "react-icons/bs";
import {NavLink} from 'react-router-dom';
import {SongsApi, WishlistApi} from "../api/src";
import SongListItem from "./SongListItem";
import SongDetailsModal from "./SongDetailsModal";
import './Wishlist.css';
import Tile from "./Tile";
import Spinner from "./Spinner";
import Input from "./Input";
import song from "../api/src/model/Song";
import SongPlayButton from "./SongPlayButton";

function Wishlist() {
    // TODO: ability to reload / websocket - maybe makes some manual state setting obsolete
    const [globalScope, setGlobalScope] = useState(true);
    const [clientWishlist, setClientWishlist] = useState([]);
    const [globalWishlist, setGlobalWishlist] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const [selectedSong, setSelectedSong] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const wishlistApi = new WishlistApi();

    useEffect(() => {
        const fetchWishlists = async () => {
            setLoading(true);
            setError(null);

            const handleWishResponse = (error, data, response, global, clientWishIds = []) => {
                if (error) {
                    console.error(error, response.text);
                    setError(error + " - " + response.text);
                } else {
                    if (global) {
                        data.wishes.forEach(wish => {
                            wish.song.wished = clientWishIds.includes(wish.song.id);
                            wish.song.wishedCount = wish.count;
                            wish.song.favorite = favoriteIds.includes(wish.song.id);
                        });

                        setGlobalWishlist(data.wishes);
                        return data.wishes;
                    } else {
                        data.wishes.forEach(wish => {
                            wish.song.wished = true;
                            wish.song.favorite = favoriteIds.includes(wish.song.id);
                        });

                        setClientWishlist(data.wishes);
                        return data.wishes;
                    }
                }
            };

            // TODO: get the actual favorites
            setFavoriteIds([]);
            wishlistApi.apiWishlistClientGetApiWishlistClientGet((error, data, response) => {
                const clientWishlist = handleWishResponse(error, data, response, false);

                let clientWishIds = clientWishlist.map(wish => wish.song.id);

                wishlistApi.apiWishlistGlobalGetApiWishlistGlobalGet((error, data, response) => {
                    handleWishResponse(error, data, response, true, clientWishIds);
                    setLoading(false);
                });
            });
        };

        fetchWishlists();
    }, []);

    const wishlist = globalScope ? globalWishlist : clientWishlist;

    if (globalScope) {
        wishlist.sort((a, b) => {
            if (a.count < b.count) return 1;
            if (a.count > b.count) return -1;
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
    }

    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    const closeModal = () => {
        setSelectedSong(null);
    };

    const handleRadioChange = (event) => {
        setGlobalScope(event.target.value === 'true');
    };

    return (
        <div className="wishlist">
            {/*TODO: global / client selection*/}
            <h2>Wishlist</h2>

            <div className={"wishlist-scope"}>
                <label>
                    <input
                        type="radio"
                        value="false"
                        checked={globalScope === false}
                        onChange={handleRadioChange}
                    />
                    <span className={"text"}>You</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="true"
                        checked={globalScope === true}
                        onChange={handleRadioChange}
                    />
                    <span className={"text"}>All</span>
                </label>
            </div>

            {loading && <Spinner/>}
            {error && <h1>{error}</h1>}
            <ul className={"songs-list wishlist"}>
                {wishlist.map(wish => (
                    <SongListItem song={wish.song} coverUrl={`/api/songs/${wish.song.id}/cover`} onClick={() => handleSongClick(wish.song)} button={<SongPlayButton song={wish.song}/>} onButton={() => {
                    }}/>
                ))}
            </ul>
            {selectedSong && <SongDetailsModal song={selectedSong} onClose={closeModal}/>}
        </div>
    );
}

export default Wishlist;
