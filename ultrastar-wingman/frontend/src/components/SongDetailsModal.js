// SongDetailsModal.js
import './SongDetailsModal.css';
import React, {useRef} from "react";
import {IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import {MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck} from "react-icons/md";
import SongPlayButton from "./SongPlayButton";
import Modal from "./Modal";
import {addFavorite, addWish, removeFavorite, removeWish} from "../helpers";

const SongDetailsModal = ({
                              song,
                              onClose,
                              setPlayerSelectionSong,
                              currentlyPlayingSong,
                              clientWishlist,
                              setClientWishlist,
                              globalWishlist,
                              setGlobalWishlist,
                              favoriteIds,
                              setFavoriteIds
                          }) => {
    const modalRef = useRef(null);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Modal fullscreen={true} ref={modalRef} className={
            "song-detail-modal"
            + ((song.id in clientWishlist) ? " wished" : "")
            + (favoriteIds.includes(song.id) ? " favorite" : "")
        } onClose={onClose}>
            <img src={`/api/songs/${song.id}/cover`} width={"256px"} alt={`${song.title} cover`}/>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            <h3>Song Preview</h3>
            <audio controls>
                <source src={`/api/songs/${song.id}/mp3`} type="audio/mp3"/>
                Your browser does not support the audio element.
            </audio>
            {/*<label className={"directory"}>{song.directory}</label>*/}
            <div className={"controls"}>
                <div>
                    <IoMdHeartEmpty className={"no-favorite"} onClick={() => addFavorite(favoriteIds, setFavoriteIds, song.id)} title={"Add to personal favorites"}/>
                    <IoMdHeart className={"favorite"} onClick={() => removeFavorite(favoriteIds, setFavoriteIds, song.id)} title={"Remove from personal favorites"}/>
                </div>
                <SongPlayButton className={"center"} song={song} setPlayerSelectionSong={setPlayerSelectionSong} currentlyPlayingSong={currentlyPlayingSong}/>
                <div>
                    <MdOutlinePlaylistAdd className={"add-wish"} onClick={() => addWish(clientWishlist, setClientWishlist, globalWishlist, setGlobalWishlist, song)} title={"Add to wishlist"}/>
                    <MdOutlinePlaylistAddCheck className={"remove-wish"} onClick={() => removeWish(clientWishlist, setClientWishlist, globalWishlist, setGlobalWishlist, song.id)} title={"Remove from wishlist"}/>
                </div>
            </div>
        </Modal>
    );
};

export default SongDetailsModal;
