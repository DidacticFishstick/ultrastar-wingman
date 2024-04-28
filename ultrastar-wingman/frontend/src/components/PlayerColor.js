// components/PlayerColor.js
import React from 'react';
import Tile from "./Tile";
import {BiSolidColor} from "react-icons/bi";
import './PlayerColor.css';

const PlayerColor = ({colors, colorMap, index, players, selectedPlayers, setSelectedPlayers}) => {
    return (
        <Tile className={"color"} style={{backgroundColor: colorMap[colors[index]]}}>
            <h2>Player {index + 1}</h2>

            <select className={selectedPlayers[index] === "" ? "empty" : ""} value={selectedPlayers[index]} onChange={(e) => {
                let newPlayers = selectedPlayers.map(player => player === e.currentTarget.value ? "" : player);
                newPlayers[index] = e.currentTarget.value;
                setSelectedPlayers(newPlayers);
            }}>
                <option value="" disabled={true} hidden={true}>Player {index + 1}</option>
                {players.map((player, index) => {
                    return <option value={player}>{player}</option>
                })}
            </select>
        </Tile>
    );
};

export default PlayerColor;
