// SongDetailsModal.js
import './SongDetailsModal.css';
import React, {useRef} from "react";
import {FaPlay, FaStop} from "react-icons/fa";
import {SongsApi, UltraStarDeluxeApi, WishlistApi} from "../api/src";
import {IoMdClose, IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import {MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck} from "react-icons/md";

const SongDetailsModal = ({song, onClose}) => {
    const modalRef = useRef(null);

    const songsApi = new SongsApi();
    const usdxApi = new UltraStarDeluxeApi();
    const wishlistApi = new WishlistApi();

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const close = (e) => {
        if (e.target !== e.currentTarget) {
            e.stopPropagation();
            return;
        }
        onClose();
    };

    const play = (force = false) => {
        songsApi.apiSingSongApiSongsSongIdSingPost(song.id, {force: force}, (error, data, response) => {
            if (error) {
                if (response.status === 409) {
                    if (window.confirm("Another song is already playing. Abort the current song and start this one?")) {
                        play(true);
                    }
                } else {
                    console.error(error, response.text);
                    alert(response.text);
                }
            } else {
                // successfully started
                modalRef.current.classList.add("playing");
            }
        });
    }

    const onPlay = (e) => {
        play();
    };

    const onStop = (e) => {
        if (window.confirm("Do you really wish to abort the current song?")) {
            usdxApi.apiUsdxKillApiUsdxKillPost((error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                    alert(response.text);
                } else {
                    // successfully killed
                    modalRef.current.classList.remove("playing");
                }
            });
        }
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
        <div className="modal-backdrop" onClick={close}>
            <IoMdClose className={"close"}/>
            {/*TODO: set playing class*/}
            <div className={
                "modal-content"
                + (song.wished ? " wished" : "")
                + (song.favorite ? " favorite" : "")
            } onClick={close} ref={modalRef}>
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
                    <div className={"center"}>
                        <FaPlay className={"play"} onClick={onPlay} title={"Start song"}/>
                        <FaStop className={"stop"} onClick={onStop} title={"Stop song"}/>
                    </div>
                    <div>
                        <MdOutlinePlaylistAdd className={"add-wish"} onClick={onAddWish} title={"Add to wishlist"}/>
                        <MdOutlinePlaylistAddCheck className={"remove-wish"} onClick={onRemoveWish} title={"Remove from wishlist"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetailsModal;
