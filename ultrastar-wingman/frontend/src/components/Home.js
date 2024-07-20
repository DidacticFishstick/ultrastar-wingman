// Home.js
import Tile from './Tile';
import {FaGithub} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import Wishlist from "./Wishlist";
import RandomSongSelector from "./RandomSongSelector";
import React from "react";

function Home() {
    return <div>
        <div className="tile-container">
            <Tile className={"title"} span>
                <span className={"logo"}></span>
                <label>Ultrastar Wingman</label>
                {/*TODO: Fill with correct version, show if update available*/}
                <div className={"info"}>
                    <span className={"version"}>Version 1.1.0</span>
                    <a href={"https://github.com/DidacticFishstick/ultrastar-wingman"} target="_blank" rel="noopener noreferrer" className={"git"}><FaGithub/> GitHub</a>
                </div>
            </Tile>
            {/*<Tile className={"icon-and-text clickable"}>*/}
            {/*    <VscSettings/>*/}
            {/*    <label>Settings</label>*/}
            {/*</Tile>*/}
            {/*<Tile className={"icon-and-text clickable"}>*/}
            {/*    <TfiReload/>*/}
            {/*    <label>Restart USDX</label>*/}
            {/*</Tile>*/}
        </div>
        <Wishlist/>
        <h2>Random Song Selector</h2>
        <RandomSongSelector/>
    </div>;
}

export default Home;
