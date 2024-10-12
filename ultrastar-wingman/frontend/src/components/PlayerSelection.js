// PlayerSelection.js
import React, {useEffect, useState} from "react";
import './Input.css';
import './PlayerSelection.css';
import {playSong, usePlayerSettings} from "../helpers";
import Modal from "./Modal";
import {IoIosCloseCircleOutline} from "react-icons/io";
import NewUnregisteredPlayer from "./NewUnregisteredPlayer";
import {MdAddBox} from "react-icons/md";
import Button from "./Button";

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

    const [showNewPlayerModal, setShowNewPlayerModal] = useState(false);

    useEffect(() => {
        setSelectedPlayers(new Array(playerSetting.colors.length).fill(null));
    }, [playerSetting.colors]);


    for (const player of playerSetting.players.registered) {
        player.registered = true;
     }
    for (const player of playerSetting.players.unregistered) {
        player.registered = false;
    }
    const players = [
        ...Object.values(playerSetting.players.registered),
        ...Object.values(playerSetting.players.unregistered),
    ];
    players.sort((a, b) => a.name.localeCompare(b.name));

    const selectPlayer = player => {
        // get free index
        const newArray = [...selectedPlayers];
        const freeIndex = selectedPlayers.findIndex(s => s === null);
        newArray[freeIndex] = player;
        setSelectedPlayers(newArray);
    };

    const selectPlayerAtIndex = (id, index) => {
        if (selectedPlayers[index]?.id === id) {
            return;
        }

        const newArray = selectedPlayers.map(p => (p?.id === id ? null : p));
        newArray[index] = players.find(p => p.id === id);
        setSelectedPlayers(newArray);
    };

    const unSelectPlayer = player => {
        const index = selectedPlayers.findIndex(p => p?.id === player.id);
        const newArray = [...selectedPlayers];
        newArray[index] = null;
        setSelectedPlayers(newArray);
    };

    const isSelected = player => {
        return selectedPlayers.filter(p => p?.id === player.id).length > 0;
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

        if (player.registered) {
            // registered
            return <div className={className} onClick={onClick}>
                <span className={"avatar"} style={{backgroundImage: `url('/api/players/registered/${player.id}/avatar')`}}></span>
                <label className={"name"}>{player.name}</label>
            </div>
        } else {
            // unregistered
            // TODO: option to remove
            return <div className={className} onClick={onClick}>
                <label className={"name"}>{player.name}</label>
            </div>
        }
    };

    const start = () => {
        const playerIds = Object.values(
            selectedPlayers.reduce((acc, item) => {
                acc[item?.id] = acc[item?.id] || [];
                acc[item?.id].push(item?.id || "");
                return acc;
            }, {})
        ).flat();

        const nVacant = playerIds.filter(id => id === "").length;
        if (nVacant === playerSetting.colors.length) {
            alert("Song cannot be started without any players");
            return;
        } else if (nVacant > 0) {
            if (!window.confirm("Are you sure you want to start the song with an incomplete player list?")) {
                return;
            }
        }

        playSong(song, playerIds, onClose);
    };

    // TODO: button to insert last configuration
    // TODO: button to clear selection

    return <Modal fullscreen={true}>
        <div className={"player-selection"}>
            <div className={"header"}>
                <h1>Player Selection</h1>
                <h2>{song.title}</h2>
            </div>
            <div className={"selected-players"}>
                {playerSetting.colors.map((color, index) => {
                    const constIndex = index;
                    return <div className={(selectedPlayers[index] ? "occupied" : "")} style={{
                        borderColor: colorMap[color] + "AA",
                        backgroundColor: colorMap[color] + "28",
                    }}>
                        <span className={"avatar"} style={{backgroundImage: `url('/api/players/avatars/default/${color}')`}}></span>

                        <div className={"player"}>
                            {selectedPlayers[index]?.registered &&
                                <span className={"avatar"} style={{backgroundImage: `url('/api/players/registered/${selectedPlayers[index].id}/avatar')`}}></span>
                            }
                            <select className={"name"} value={selectedPlayers[index]?.id || "unset"} onChange={(e) => selectPlayerAtIndex(e.target.value, constIndex)}>
                                <option key={-1} disabled={true} value={"unset"}>{`Player ${index + 1}`}</option>
                                {players.map((p, index) => (
                                    <option key={index} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            {selectedPlayers[index] &&
                                <IoIosCloseCircleOutline className={"remove"} onClick={() => unSelectPlayer(selectedPlayers[constIndex])}/>
                            }
                        </div>
                    </div>
                })}
            </div>
            <div className={"all-players"}>
                <div className={"player-list"}>
                    {players.map((player, index) => (
                        createPlayerDiv(player)
                    ))}
                    <div className={"player new"} onClick={() => setShowNewPlayerModal(true)}>
                        <MdAddBox className={"add-button"}/>
                        <label className={"name"}>Add Player</label>
                    </div>
                </div>
            </div>
            <div className={"controls"}>
                <Button
                    onClick={onClose}
                >Cancel</Button>
                <Button
                    blue={true}
                    disabled={selectedPlayers.filter(player => player !== null).length === 0}
                    onClick={start}
                >Play</Button>
            </div>
        </div>
        {showNewPlayerModal &&
            <NewUnregisteredPlayer
                players={players}
                setPlayerSettings={setPlayerSettings}
                onClose={() => setShowNewPlayerModal(false)}
            />
        }
    </Modal>;
}

export default PlayerSelection;
