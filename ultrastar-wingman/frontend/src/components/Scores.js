// Scores.js
import React, {useEffect, useState} from "react";
import {ScoresApi} from "../api/src";
import Spinner from "./Spinner";
import Boxplot from "./Boxplot";
import './Scores.css';
import Tile from "./Tile";

function Scores() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    const api = new ScoresApi();

    useEffect(() => {
        const fetchSessions = async () => {
            api.apiSessionsGetApiSessionsGet((error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                } else {
                    setSessions(data.sessions);
                }
            });
        };

        const fetchCurrentScores = async () => {
            api.apiScoresGetApiScoresGet({}, (error, data, response) => {
                if (error) {
                    console.error(error, response.text);
                } else {
                    setCurrentSession(data.session);
                    setScores(data.scores);
                }
                setLoading(false);
            });
        };

        fetchSessions();
        fetchCurrentScores();
    }, []);

    // TODO: component for this
    const groupedData = scores.reduce((acc, item) => {
        const key = `${item.usdx_id}-${item.title}`;
        if (!acc[key]) {
            acc[key] = {
                title: item.title,
                artist: item.artist,
                scores: []
            };
        }
        acc[key].scores.push({player: item.player, score: item.score});
        acc[key].scores.sort((a, b) => b.score - a.score); // Sort descending by score
        return acc;
    }, {});
    const songData = Object.values(groupedData);

    return (
        <div className="scores-page">
            <h1>
                <select value={currentSession.id} onChange={(e) => {
                    setLoading(true)
                    setCurrentSession(sessions[parseInt(e.currentTarget.value)]);

                    api.apiScoresGetApiScoresSessionIdGet(parseInt(e.currentTarget.value), (error, data, response) => {
                        if (error) {
                            console.error(error, response.text);
                        } else {
                            setCurrentSession(data.session);
                            setScores(data.scores);
                            setLoading(false);
                        }
                    });
                }}>
                    {sessions.map((session, index) => {
                        return <option value={session.id}>{(new Date(session.start_time * 1000)).toISOString().substring(0, 10)}</option>
                    })}
                </select>
            </h1>

            {loading && <Spinner/>}

            <div className="tile-container">
                <Tile className={"boxplot"} span={true}>
                    <h1>Score Distribution</h1>
                    <Boxplot rawData={scores}/>
                </Tile>
            </div>

            <h1>By Song</h1>

            {songData.map((song, index) => (
                <div key={index}>
                    <h2>{song.title} by {song.artist}</h2>
                    <ul>
                        {song.scores.map((entry, idx) => (
                            <li key={idx}>{entry.player}: {entry.score}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Scores;
