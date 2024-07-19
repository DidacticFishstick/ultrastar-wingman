// SongDetailsModal.js
import './SongDetailsModal.css';
import React, {useRef} from "react";
import {FaPlay, FaStop} from "react-icons/fa";
import {SongsApi, UltraStarDeluxeApi, WishlistApi} from "../api/src";
import {IoMdClose, IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import {MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck} from "react-icons/md";
import SongPlayButton from "./SongPlayButton";
import FullScreenModal from "./FullScreenModal";
import Spinner from "./Spinner";

const SongDetailsModal = ({song, onClose}) => {
    const modalRef = useRef(null);

    const wishlistApi = new WishlistApi();

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const onAddWish = (e) => {
        wishlistApi.apiWishlistClientPostApiWishlistClientPost({song_id: song.id}, (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                alert(response.text);
            } else {
                // successfully wished
                modalRef.current.classList.add("wished");
                song.wished = true;
                if (song.wishedCount !== undefined) {
                    song.wishedCount++;
                }
            }
        });
    };

    const onRemoveWish = (e) => {
        wishlistApi.apiWishlistClientDeleteApiWishlistClientDelete(song.id, (error, data, response) => {
            if (error) {
                console.error(error, response.text);
                alert(response.text);
            } else {
                // successfully removed
                modalRef.current.classList.remove("wished");
                song.wished = false;
                if (song.wishedCount !== undefined) {
                    song.wishedCount--;
                }
            }
        });
    };

    const onAddFavorite = (e) => {
        modalRef.current.classList.add("favorite");
        song.favorite = true;
        alert("Personal favorites are not yet implemented");
    };

    const onRemoveFavorite = (e) => {
        modalRef.current.classList.remove("favorite");
        song.favorite = false;
    };

    return (
        <FullScreenModal ref={modalRef} className={
            "song-detail-modal"
            + (song.wished ? " wished" : "")
            + (song.favorite ? " favorite" : "")
        } onClose={onClose}>
            <img src={`/api/songs/${song.id}/cover`} height={"250px"} alt={`${song.title} cover`}/>
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
                    <IoMdHeartEmpty className={"no-favorite"} onClick={onAddFavorite} title={"Add to personal favorites"}/>
                    <IoMdHeart className={"favorite"} onClick={onRemoveFavorite} title={"Remove from personal favorites"}/>
                </div>
                <SongPlayButton song={song} className={"center"}/>
                <div>
                    <MdOutlinePlaylistAdd className={"add-wish"} onClick={onAddWish} title={"Add to wishlist"}/>
                    <MdOutlinePlaylistAddCheck className={"remove-wish"} onClick={onRemoveWish} title={"Remove from wishlist"}/>
                </div>
            </div>
        </FullScreenModal>
    );
};

export default SongDetailsModal;
