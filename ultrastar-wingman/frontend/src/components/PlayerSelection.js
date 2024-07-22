// PlayerSelection.js
import React, {useEffect, useState} from "react";
import './Input.css';
import './PlayerSelection.css';
import {playSong, usePlayerSettings} from "../helpers";
import FullScreenModal from "./FullScreenModal";
import {IoMdRemoveCircleOutline} from "react-icons/io";

function PlayerSelection({
                             song,
                             onClose
                         }) {
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

    const [playerSetting, setPlayerSettings] = usePlayerSettings();

    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        setSelectedPlayers(new Array(playerSetting.colors.length).fill(null));
    }, [playerSetting]);

    const players = [
        ...Object.values(playerSetting.players.registered),
        ...Object.values(playerSetting.players.unregistered),
    ];
    players.sort((a, b) => a.name.localeCompare(b.name));

    const selectPlayer = player => {
        const freeIndex = selectedPlayers.findIndex(s => s === null);
        const newArray = [...selectedPlayers];
        newArray[freeIndex] = player;
        setSelectedPlayers(newArray);
    };

    const unSelectPlayer = player => {
        const index = selectedPlayers.findIndex(p => p?.name === player.name);
        const newArray = [...selectedPlayers];
        newArray[index] = null;
        setSelectedPlayers(newArray);
    };

    const isSelected = player => {
        return selectedPlayers.filter(p => p?.name === player.name).length > 0;
    };

    const createPlayerDiv = player => {
        const onClick = () => {
            if (isSelected(player)) {
                unSelectPlayer(player);
            } else {
                selectPlayer(player);
            }
        };

        const className = "player" + (isSelected(player) ? " selected" : "");

        if (player.id === undefined) {
            // unregistered
            return <div className={className} onClick={onClick}>
                <label className={"name"}>{player.name}</label>
            </div>
        } else {
            // registered
            return <div className={className} onClick={onClick}>
                <span className={"avatar"} style={{backgroundImage: `url('/api/players/registered/${player.id}/avatar')`}}></span>
                <label className={"name"}>{player.name}</label>
            </div>
        }
    };

    const createSelectedPlayerDiv = player => {
        return <div className={"player"}>
            {player.id &&
                <span className={"avatar"} style={{backgroundImage: `url('/api/players/registered/${player.id}/avatar')`}}></span>
            }
            <label className={"name"}>{player.name}</label>
            <IoMdRemoveCircleOutline className={"remove"} onClick={() => unSelectPlayer(player)}/>
        </div>;
    };

    const start = () => {
        const playerNames = selectedPlayers.reduce((acc, item) => {
            acc[item?.name] = acc[item?.name] || [];
            acc[item?.name].push(item?.name || "");
            return acc;
        }, {});
        playSong(song, Object.values(playerNames).flat(), onClose);
    };

    // TODO: button to insert last configuration

    return <FullScreenModal>
        <div className={"player-selection"}>
            <div className={"header"}>
                <h1>Player Selection</h1>
                <h2>{song.title}</h2>
            </div>
            <div className={"selected-players"}>
                {playerSetting.colors.map((color, index) => (
                    <div className={(selectedPlayers[index] ? "occupied" : "")} style={{
                        borderColor: colorMap[color] + "AA",
                        backgroundColor: colorMap[color] + "22",
                    }}>
                        <span className={"avatar"} style={{backgroundImage: `url('/api/players/avatars/default/${color}')`}}></span>
                        {!selectedPlayers[index] &&
                            <label className={"placeholder"}>{`Player ${index + 1}`}</label>
                        }
                        {selectedPlayers[index] &&
                            createSelectedPlayerDiv(selectedPlayers[index], true)
                        }
                    </div>
                ))}
            </div>
            <div className={"all-players"}>
                <div className={"player-list"}>
                    {players.map((player, index) => (
                        createPlayerDiv(player, false)
                    ))}
                </div>
            </div>
            <div className={"controls"}>
                {/*TODO: send the players*/}
                <span onClick={() => onClose()}>Cancel</span>
                <span className={"play"} onClick={start}>Play</span>
            </div>
        </div>
    </FullScreenModal>;
}

export default PlayerSelection;
