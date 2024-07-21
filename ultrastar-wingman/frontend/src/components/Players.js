// Players.js
import React, {useEffect, useState} from "react";
import {PlayersApi} from "../api/src";
import PlayerColor from "./PlayerColor";
import './Input.css';
import './Players.css';

function Players() {
    const colorMap = {
        "blue": "#048BB9",
        "red": "#D00000",
        "green": "#00AC00",
        "yellow": "#E7E700",
        "orange": "#E77300",
        "pink": "#E764A3",
        "violet": "#9F00BE",
        "brown": "#C5951D",
        "gray": "#888888",
        "dark_blue": "#0000C7",
        "sky": "#0064BE",
        "cyan": "#00C3C3",
        "flame": "#BE3F00",
        "orchid": "#BE00BE",
        "harlequin": "#64BE00",
        "green_yellow": "#91BE00"
    };

    // TODO: get current settings
    const [colors, setColors] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const api = new PlayersApi();

    useEffect(() => {
        const fetchPlayers = async () => {
            // TODO: helpers.js
            api.apiPlayersApiPlayersGet((error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                } else {
                    setPlayers(data.players);
                    setColors(data.colors);
                    setSelectedPlayers(new Array(data.colors.length).fill(""))
                }
            });
        };

        fetchPlayers();
    }, []);

    return (
        <div className="players-page">
            {/*TODO: option to edit player list*/}

            <h2>Microphone Assignment</h2>
            <div className="colors tile-container">
                {colors.map((color, index) => (
                    <PlayerColor colors={colors} colorMap={colorMap} index={index} players={players} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers}/>
                ))}
            </div>

            <span className={"button"} onClick={() => {
                if (window.confirm("Names can only be entered in the player selection. Do not run this if the player selection is not currently open.")) {
                    api.apiPlayersSubmitApiPlayersSubmitPost(JSON.stringify({players: players}), (error, data, response) => {
                        if (error) {
                            console.error(error, response.text);
                        }
                    });
                }
            }}>Submit</span>
        </div>
    );
}

export default Players;
