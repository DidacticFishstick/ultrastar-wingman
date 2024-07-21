import {useEffect, useState} from 'react';
import {SongsApi, UltraStarDeluxeApi, USDBApi, WishlistApi} from "./api/src";
import WebSocketService from "./websocketService";

const wishlistApi = new WishlistApi();
const songsApi = new SongsApi();
const usdbApi = new USDBApi();
const usdxApi = new UltraStarDeluxeApi();

// TODO: fix the websocket (first line should work on build stuff where everything is on the same host)
// const wsService = new WebSocketService(`ws://${window.location.host}/ws`);
const wsService = new WebSocketService(`ws://${window.location.hostname}:8080/ws`);


function displayApiError(error, data, response) {
    console.error(error, response.text);
    // TODO: better error handling
    alert(response.text);
}

// handles errors for the api callback and only calls the given callback on success with the data
export function apiCallback(callback) {
    return (error, data, response) => {
        if (error) {
            displayApiError(error, data, response);
        } else {
            if (callback !== undefined) {
                callback(data);
            }
        }
    }
}

class Lock {
    constructor() {
        this.lock = Promise.resolve();
    }

    acquire() {
        let unlockNext;
        this.lock = new Promise(resolve => (unlockNext = resolve));
        return unlockNext;
    }
}

// region States

export function useCurrentlyPlayingSong() {
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState(null);

    useEffect(() => {
        songsApi.apiGetSongByIdApiSongsSongIdGet("current", (error, data, response) => {
            if (error) {
                if (response.status === 404) {
                    setCurrentlyPlayingSong(null);
                } else {
                    displayApiError(error, data, response);
                }
            } else {
                setCurrentlyPlayingSong(data)
            }
        });

        wsService.registerCallback("active_song", song => {
            if (song.id === undefined) {
                setCurrentlyPlayingSong(null)
            } else {
                setCurrentlyPlayingSong(song)
            }
        });
    }, []);

    return [currentlyPlayingSong, setCurrentlyPlayingSong];
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

        // only the global wishlist is done using websocket
    }, []);

    return [clientWishlist, setClientWishlist];
}

export function useGlobalWishlist() {
    const [globalWishlist, setGlobalWishlist] = useState({});

    useEffect(() => {
        wishlistApi.apiWishlistGlobalGetApiWishlistGlobalGet(apiCallback(data => {
            // convert to json with song ids as keys
            setGlobalWishlist(data.wishes.reduce((acc, wish) => {
                acc[wish.song.id] = wish;
                return acc;
            }, {}));
        }));

        wsService.registerCallback("wish_added", wish => {
            setGlobalWishlist(prevState => ({
                ...prevState,
                [wish.song.id]: wish
            }));
        });

        wsService.registerCallback("wish_removed", wish => {
            if (wish.song.id in globalWishlist) {
                if (wish.count === 0) {
                    setGlobalWishlist(prevState => {
                        const {[wish.song.id]: _, ...newState} = globalWishlist;
                        setGlobalWishlist(newState);
                    });
                } else {
                    setGlobalWishlist(prevState => ({
                        ...prevState,
                        [wish.song.id]: wish
                    }));
                }
            }
        });
    }, []);

    return [globalWishlist, setGlobalWishlist];
}

export function useSongs() {
    const [songs, setSongs] = useState({});

    useEffect(() => {
        songsApi.apiSongsApiSongsGet(apiCallback(data => {
            setSongs(data.songs);

            // convert to json with song ids as keys
            setSongs(data.songs.reduce((acc, song) => {
                acc[song.id] = song;
                return acc;
            }, {}));
        }));

        wsService.registerCallback("download_finished", song => {
            if (!(song.id in songs)) {
                setSongs(prevState => ({
                    ...prevState,
                    [song.id]: song
                }));
            }
        });
    }, []);

    return [songs, setSongs];
}

export function useDownloadQueue() {
    // USDB IDs for queued, started and finished, {id: error} for failed
    const [downloadQueue, setDownloadQueue] = useState({
        queued: [],
        started: [],
        finished: [],
        failed: {}
    });

    const lock = new Lock();

    const copyDownloadQueue = (currentQueue) => {
        return {
            ...currentQueue,
            queued: [...currentQueue.queued],
            started: [...currentQueue.started],
            finished: [...currentQueue.finished],
            failed: {...currentQueue.failed}
        }
    }

    // TODO: get the current queue from some API endpoint

    useEffect(() => {
        wsService.registerCallback("download_queued", async message => {
            const release = await lock.acquire();

            try {
                setDownloadQueue(currentQueue => {
                    const newDownloadQueue = copyDownloadQueue(currentQueue);

                    // remove from all other lists (can only be in one)
                    if (message.usdb_id in newDownloadQueue.failed) {
                        delete newDownloadQueue.failed[message.usdb_id];
                    }

                    // skip if already started or finished
                    if (newDownloadQueue.started.includes(message.usdb_id)) {
                        return newDownloadQueue;
                    } else if (newDownloadQueue.finished.includes(message.usdb_id)) {
                        return newDownloadQueue;
                    }

                    // add to queued
                    if (!newDownloadQueue.queued.includes(message.usdb_id)) {
                        newDownloadQueue.queued.push(message.usdb_id);
                    }

                    setDownloadQueue(newDownloadQueue);

                    return newDownloadQueue;
                });
            } finally {
                release();
            }
        })

        wsService.registerCallback("download_started", async message => {
            const release = await lock.acquire();

            try {
                setDownloadQueue(currentQueue => {
                    const newDownloadQueue = copyDownloadQueue(currentQueue);

                    // remove from all other lists (can only be in one)
                    if (newDownloadQueue.queued.includes(message.usdb_id)) {
                        newDownloadQueue.queued = newDownloadQueue.queued.filter(id => id !== message.usdb_id);
                    } else if (message.usdb_id in newDownloadQueue.failed) {
                        delete newDownloadQueue.failed[message.usdb_id];
                    }

                    // skip if already finished
                    if (newDownloadQueue.finished.includes(message.usdb_id)) {
                        return newDownloadQueue;
                    }

                    // add to started
                    if (!newDownloadQueue.started.includes(message.usdb_id)) {
                        newDownloadQueue.started.push(message.usdb_id);
                    }

                    setDownloadQueue(newDownloadQueue);

                    return newDownloadQueue;
                });
            } finally {
                release();
            }
        })

        wsService.registerCallback("download_finished", async message => {
            const release = await lock.acquire();

            try {
                setDownloadQueue(currentQueue => {
                    const newDownloadQueue = copyDownloadQueue(currentQueue);

                    // remove from all other lists (can only be in one)
                    if (newDownloadQueue.started.includes(message.usdb_id)) {
                        newDownloadQueue.started = newDownloadQueue.started.filter(id => id !== message.usdb_id);
                    } else if (newDownloadQueue.queued.includes(message.usdb_id)) {
                        newDownloadQueue.queued = newDownloadQueue.queued.filter(id => id !== message.usdb_id);
                    } else if (message.usdb_id in newDownloadQueue.failed) {
                        delete newDownloadQueue.failed[message.usdb_id];
                    }

                    // add to finished
                    if (!newDownloadQueue.finished.includes(message.usdb_id)) {
                        newDownloadQueue.finished.push(message.usdb_id);
                    }

                    setDownloadQueue(newDownloadQueue);

                    return newDownloadQueue;
                });
            } finally {
                release();
            }
        })

        wsService.registerCallback("download_failed", async message => {
            const release = await lock.acquire();

            try {
                setDownloadQueue(currentQueue => {
                    const newDownloadQueue = copyDownloadQueue(currentQueue);

                    // remove from all other lists (can only be in one)
                    if (newDownloadQueue.started.includes(message.usdb_id)) {
                        newDownloadQueue.started = newDownloadQueue.started.filter(id => id !== message.usdb_id);
                    } else if (newDownloadQueue.queued.includes(message.usdb_id)) {
                        newDownloadQueue.queued = newDownloadQueue.queued.filter(id => id !== message.usdb_id);
                    }

                    // skip if already finished
                    if (newDownloadQueue.finished.includes(message.usdb_id)) {
                        return newDownloadQueue;
                    }

                    // add to failed
                    if (!(message.usdb_id in newDownloadQueue.failed)) {
                        newDownloadQueue.failed[message.usdb_id] = message.error;
                    }

                    setDownloadQueue(newDownloadQueue);

                    console.warn(`USDB download failed (${message.usdb_id}):`, message.error);

                    return newDownloadQueue;
                });
            } finally {
                release();
            }
        })
    }, []);

    return [downloadQueue, setDownloadQueue]
}

// endregion

export function getRandomSong(callback) {
    songsApi.apiGetSongByIdApiSongsSongIdGet("random", apiCallback(callback));
}

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
    wishlistApi.apiWishlistClientDeleteApiWishlistClientDelete(id, apiCallback(data => {
        if (id in clientWishlist) {
            const {[id]: _, ...newState} = clientWishlist;
            setClientWishlist(newState);
        }
    }));
}

export function downloadFromUsdb(usdbId) {
    usdbApi.apiUsdbDownloadApiUsdbDownloadPost(JSON.stringify({id: usdbId}), apiCallback());
}

export function playSong(song, force = false) {
    songsApi.apiSingSongApiSongsSongIdSingPost(song.id, {force: force}, (error, data, response) => {
        if (error) {
            if (response.status === 409) {
                // TODO: custom modal
                if (window.confirm("Another song is already playing. Abort the current song and start this one?")) {
                    playSong(song, true);
                }
            } else {
                displayApiError(error, data, response)
            }
        }
    });
}

export function killUsdb() {
    // TODO: custom modal
    if (window.confirm("Do you really wish to kill Ultrastar Deluxe and abort any running song?")) {
        usdxApi.apiUsdxKillApiUsdxKillPost(apiCallback());
    }
}