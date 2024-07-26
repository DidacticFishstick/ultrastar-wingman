// components/NewUnregisteredPlayer.js
import React, {useEffect, useState} from 'react';
import './NewUnregisteredPlayer.css';
import Modal from "./Modal";
import {FaSearch} from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import {addUnregisteredPlayer} from "../helpers";

const NewUnregisteredPlayer = ({
                                   players,
                                   setPlayerSettings,
                                   onClose
                               }) => {
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');

    const submit = () => {
        addUnregisteredPlayer(playerName, data => {
            setPlayerSettings(prevState => ({
                ...prevState,
                players: {
                    ...prevState.players,
                    unregistered: [...prevState.players.unregistered, {
                        name: playerName
                    }]
                }
            }));
            onClose();
        });
    }

    useEffect(() => {
        if (players.filter(player => player.name === playerName).length > 0) {
            setError("This name is already taken");
        } else {
            setError("");
        }
    }, [playerName]);

    return <Modal className={"new-unregistered-player"} onClose={onClose}>
        <h1>New Temporary Player</h1>
        <Input
            type="text"
            placeholder="Player Name"
            icon={<FaSearch/>}
            value={playerName}
            setValue={setPlayerName}
            onEnter={submit}
        />
        {error &&
            <p className={"error"}>{error}</p>
        }
        <div className={"buttons"}>
            <Button
                onClick={onClose}
            >Cancel</Button>
            <Button
                blue={true}
                disabled={error || playerName === ""}
                onClick={submit}
            >Add</Button>
        </div>
    </Modal>;
};

export default NewUnregisteredPlayer;
