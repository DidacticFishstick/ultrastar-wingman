import {useEffect, useState} from 'react';
import {SongsApi, WishlistApi} from "./api/src";
import WebSocketService from "./websocketService";
import websocketService from "./websocketService";

const wishlistApi = new WishlistApi();
const songsApi = new SongsApi();

// const wsService = new WebSocketService(`ws://${window.location.host}/ws`);
const wsService = new WebSocketService(`ws://localhost:8080/ws`);

// handles errors for the api callback and only calls the given callback on success with the data
export function apiCallback(callback) {
    return (error, data, response) => {
        if (error) {
            console.error(error, response.text);
            // TODO: better error handling
            alert(response.text);
        } else {
            callback(data);
        }
    }
}

// region States

export function useCurrentlyPlayingSong() {
    const [favoriteIds, setFavoriteIds] = useState(null);

    // TODO: actually get the currently playing song

    return [favoriteIds, setFavoriteIds];
}

export function useFavoriteIds() {
    const [favoriteIds, setFavoriteIds] = useState([]);

    // TODO: actually get the favorites

    return [favoriteIds, setFavoriteIds];
}

export function useClientWishlist() {
    const [clientWishlist, setClientWishlist] = useState({});

    useEffect(() => {
        wishlistApi.apiWishlistClientGetApiWishlistClientGet(apiCallback(data => {
            // convert to json with song ids as keys
            setClientWishlist(data.wishes.reduce((acc, obj) => {
                acc[obj.song.id] = obj;
                return acc;
            }, {}));
        }));
    }, []);

    return [clientWishlist, setClientWishlist];
}

export function useGlobalWishlist() {
    const [globaltWishlist, setGlobalWishlist] = useState({});

    useEffect(() => {
        wishlistApi.apiWishlistGlobalGetApiWishlistGlobalGet(apiCallback(data => {
            // convert to json with song ids as keys
            setGlobalWishlist(data.wishes.reduce((acc, obj) => {
                acc[obj.song.id] = obj;
                return acc;
            }, {}));
        }));
    }, []);

    return [globaltWishlist, setGlobalWishlist];
}

export function useSongs() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        songsApi.apiSongsApiSongsGet(apiCallback(data => {
            setSongs(data.songs);
        }));

        wsService.registerCallback("download_finished", song => {
            setSongs([...songs, song]);
        });
    }, []);

    return [songs, setSongs];
}

// endregion

export function addFavorite(favoriteIds, setFavoriteIds, id) {
    // TODO: send to backend
    if (!favoriteIds.includes(id)) {
        setFavoriteIds([...favoriteIds, id]);
    }
}

export function removeFavorite(favoriteIds, setFavoriteIds, id) {
    // TODO: send to backend
    setFavoriteIds(prevState => prevState.filter(item => item !== id));
}


export function addWish(clientWishlist, setClientWishlist, globalWishlist, setGlobalWishlist, song) {
    wishlistApi.apiWishlistClientPostApiWishlistClientPost({song_id: song.id}, apiCallback(data => {
        if (globalWishlist !== undefined) {
            if (song.id in globalWishlist) {
                globalWishlist[song.id].count++;
                setGlobalWishlist(globalWishlist);
            } else {
                setGlobalWishlist(prevState => ({
                    ...prevState,
                    [song.id]: {
                        count: 1,
                        date: new Date().getTime(),
                        song: song
                    }
                }));
            }
        }

        if (!(song.id in clientWishlist)) {
            setClientWishlist(prevState => ({
                ...prevState,
                [song.id]: {
                    count: 1,
                    date: new Date().getTime(),
                    song: song
                }
            }));
        }
    }));
}

export function removeWish(clientWishlist, setClientWishlist, globalWishlist, setGlobalWishlist, id) {
    // TODO: optional global
    wishlistApi.apiWishlistClientDeleteApiWishlistClientDelete(id, apiCallback(data => {
        if (globalWishlist !== undefined) {
            if (id in globalWishlist) {
                if (globalWishlist[id].count > 1) {
                    globalWishlist[id].count--;
                    setGlobalWishlist(globalWishlist);
                } else {
                    const {[id]: _, ...newState} = globalWishlist;
                    setGlobalWishlist(newState);
                }
            }
        }

        if (id in clientWishlist) {
            const {[id]: _, ...newState} = clientWishlist;
            setClientWishlist(newState);
        }
    }));
}