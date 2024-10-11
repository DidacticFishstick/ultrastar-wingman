// Home.js
import Tile from './Tile';
import {FaGithub} from 'react-icons/fa';
import './Home.css';
import Wishlist from "./Wishlist";
import RandomSongSelector from "./RandomSongSelector";
import React, {useState} from "react";
import SongDetailsModal from "./SongDetailsModal";
import {useClientWishlist, useCurrentlyPlayingSong, useFavoriteIds, useGlobalWishlist, useUltrastarWingmanState} from "../helpers";
import CurrentlyPlayingSong from "./CurrentlyPlayingSong";
import PlayerSelection from "./PlayerSelection";

function Home() {
    const [ultrastarWingmanState, setUltrastarWingmanState] = useUltrastarWingmanState();
    const [currentlyPlayingSong, setCurrentlyPlayingSong] = useCurrentlyPlayingSong();
    const [selectedSong, setSelectedSong] = useState(null);
    const [playerSelectionSong, setPlayerSelectionSong] = useState(null);

    const [clientWishlist, setClientWishlist] = useClientWishlist();
    const [globalWishlist, setGlobalWishlist] = useGlobalWishlist();
    const [favoriteIds, setFavoriteIds] = useFavoriteIds();

    return <div className="home">
        <div className="tile-container">
            <Tile className={"title"} span>
                <span className={"logo"}></span>
                <label>Ultrastar Wingman</label>
                <div className={"info"}>
                    <span className={"version"}>{`Version ${ultrastarWingmanState.version ? ultrastarWingmanState.version : ''}`}</span>
                    <a href={"https://github.com/DidacticFishstick/ultrastar-wingman"} target="_blank" rel="noopener noreferrer" className={"git"}><FaGithub/> GitHub</a>
                </div>
                {ultrastarWingmanState.new_version &&
                    <a href={"https://github.com/DidacticFishstick/ultrastar-wingman/releases"} className={"new-version"}>{`New version available: ${ultrastarWingmanState.new_version}`}</a>
                }
            </Tile>
        </div>

        <CurrentlyPlayingSong
            currentlyPlayingSong={currentlyPlayingSong}
            setSelectedSong={setSelectedSong}
        />

        <Wishlist
            setSelectedSong={setSelectedSong}
            setPlayerSelectionSong={setPlayerSelectionSong}
            currentlyPlayingSong={currentlyPlayingSong}
            clientWishlist={clientWishlist}
            globalWishlist={globalWishlist}
            favoriteIds={favoriteIds}
        />

        <h2>Random Song Selector</h2>
        <RandomSongSelector
            setSelectedSong={setSelectedSong}
            setPlayerSelectionSong={setPlayerSelectionSong}
            currentlyPlayingSong={currentlyPlayingSong}
            globalWishlist={globalWishlist}
        />

        {selectedSong && !playerSelectionSong &&
            <SongDetailsModal
                song={selectedSong}
                onClose={() => setSelectedSong(null)}
                setPlayerSelectionSong={setPlayerSelectionSong}
                currentlyPlayingSong={currentlyPlayingSong}
                clientWishlist={clientWishlist}
                setClientWishlist={setClientWishlist}
                globalWishlist={globalWishlist}
                setGlobalWishlist={setGlobalWishlist}
                favoriteIds={favoriteIds}
                setFavoriteIds={setFavoriteIds}
            />
        }

        {playerSelectionSong &&
            <PlayerSelection
                song={playerSelectionSong}
                onClose={() => setPlayerSelectionSong(false)}
            />
        }
    </div>;
}

export default Home;
