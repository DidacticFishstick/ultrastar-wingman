// Wishlist.js
import React, {useState} from 'react';
import SongListItem from "./SongListItem";
import './Wishlist.css';
import SongPlayButton from "./SongPlayButton";

function Wishlist({
                      setSelectedSong,
                      currentlyPlayingSong,
                      clientWishlist,
                      globalWishlist,
                      favoriteIds,
                  }) {
    const [globalScope, setGlobalScope] = useState(true);

    const wishlist = globalScope ? Object.values(globalWishlist) : Object.values(clientWishlist);

    wishlist.sort((a, b) => {
        if (globalScope && (a.count < b.count)) return 1;
        if (globalScope && (a.count > b.count)) return -1;
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    const handleRadioChange = (event) => {
        setGlobalScope(event.target.value === 'true');
    };

    return (
        <div className="wishlist">
            <h2>
                <span>Wishlist</span>

                <div className={"wishlist-scope"}>
                    <label>
                        <input
                            type="radio"
                            value="true"
                            checked={globalScope === true}
                            onChange={handleRadioChange}
                        />
                        <span className={"text"}>Everyone</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="false"
                            checked={globalScope === false}
                            onChange={handleRadioChange}
                        />
                        <span className={"text"}>You</span>
                    </label>
                </div>
            </h2>

            <ul className={"songs-list wishlist carousel"}>
                {wishlist.map(wish => (
                    <SongListItem
                        song={wish.song}
                        coverUrl={`/api/songs/${wish.song.id}/cover`}
                        onClick={() => handleSongClick(wish.song)}
                        button={<SongPlayButton song={wish.song} currentlyPlayingSong={currentlyPlayingSong}/>}
                        onButton={() => {
                        }}
                        globalWishlist={globalWishlist}
                        clientWishList={clientWishlist}
                        favoriteIds={favoriteIds}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;
