// Scores.js
import React, {useEffect, useRef, useState} from "react";
import {MdExpandMore} from "react-icons/md";
import { TbMathAvg } from "react-icons/tb";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import {ScoresApi} from "../api/src";
import Spinner from "./Spinner";
import Boxplot from "./Boxplot";
import './Scores.css';
import Tile from "./Tile";
import RadioButton from "./RadioButton";
import {FaSearch} from "react-icons/fa";
import Input from "./Input";

function Scores() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scoreGroups, setScoreGroups] = useState('player');
    const [scoreSort, setScoreSort] = useState('alphabetically');
    const [songSearchTerm, setSongSearchTerm] = useState('');

    const inputRef = useRef();

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

    const groupedData = scores.reduce((acc, item) => {
        const key = `${item.usdx_id}-${item.title}`;
        if (!acc[key]) {
            acc[key] = {
                song_id: item.song_id,
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

    // calculate some additional data
    const calculateBestScore = (scores) => Math.max(...scores.map(s => s.score));
    const calculateWorstScore = (scores) => Math.min(...scores.map(s => s.score));
    const calculateAverageScore = (scores) => Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);
    songData.forEach(song => {
        song.bestScore = calculateBestScore(song.scores);
        song.worstScore = calculateWorstScore(song.scores);
        song.averageScore = calculateAverageScore(song.scores);
    });

    // Filter songs based on search term
    const filteredSongData = songData.filter(song =>
        song.title.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        song.scores.some(score => score.player.toLowerCase().includes(songSearchTerm.toLowerCase()))
    );

    // sort songs
    let sortedSongData;

    switch (scoreSort) {
        case 'avg-score':
            sortedSongData = songData.sort((a, b) => {
                if (a.averageScore < b.averageScore) return 1;
                if (a.averageScore > b.averageScore) return -1;
                return 0;
            });
            break
        case 'best-score':
            sortedSongData = songData.sort((a, b) => {
                if (a.bestScore < b.bestScore) return 1;
                if (a.bestScore > b.bestScore) return -1;
                return 0;
            });
            break
        case 'worst-score':
            sortedSongData = songData.sort((a, b) => {
                if (a.worstScore < b.worstScore) return -1;
                if (a.worstScore > b.worstScore) return 1;
                return 0;
            });
            break
        case 'alphabetically':
        default:
            sortedSongData = songData.sort((a, b) => {
                if (a.artist < b.artist) return -1;
                if (a.artist > b.artist) return 1;
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            break
    }

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

            <h2>Grouping</h2>
            <RadioButton text={"don't group"} value={"no"} state={scoreGroups} setState={setScoreGroups}/>
            <RadioButton text={"group by player"} value={"player"} state={scoreGroups} setState={setScoreGroups}/>
            <RadioButton text={"group by song"} value={"song"} state={scoreGroups} setState={setScoreGroups}/>

            <h2>Sorting</h2>
            <RadioButton text={"alphabetically"} value={"alphabetically"} state={scoreSort} setState={setScoreSort}/>
            <RadioButton text={"average score"} value={"avg-score"} state={scoreSort} setState={setScoreSort}/>
            <RadioButton text={"best score"} value={"best-score"} state={scoreSort} setState={setScoreSort}/>
            <RadioButton text={"worst score"} value={"worst-score"} state={scoreSort} setState={setScoreSort}/>

            <div ref={inputRef} className="songs-search">
                <Input type="text" placeholder="Search Scores" icon={<FaSearch/>} searchTerm={songSearchTerm} setSearchTerm={setSongSearchTerm} onEnter={() => {
                }} onFocus={() => {
                    setTimeout(() => {
                        inputRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                    }, 50);
                }}/>
            </div>

            <div className={"grouped-songs"}>
                {sortedSongData.map((song, index) => (
                    <div key={index} className={"score-group song"}>
                        <div className={'header'} onClick={(e) => {
                            e.currentTarget.classList.toggle("expanded")
                        }}>
                            <div className={"cover"} style={{backgroundImage: `url('/api/songs/${song.song_id}/cover')`}}></div>
                            <div className={'details'}>
                                <div className={'title'}>{song.artist} | {song.title}</div>
                                <div className={'data'}>
                                    <FaLongArrowAltUp />
                                    <span>{`${song.scores[0].player} (${song.scores[0].score})`}</span>
                                    <FaLongArrowAltDown/>
                                    <span>{`${song.scores[song.scores.length - 1].player} (${song.scores[song.scores.length - 1].score})`}</span>
                                    <TbMathAvg/>
                                    <span>{`${song.averageScore}`}</span>
                                </div>
                            </div>
                            <div className={"expand"}>
                                <MdExpandMore/>
                            </div>
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                            {song.scores.map((entry, idx) => (
                                <tr>
                                    <td>{entry.player}</td>
                                    <td>{entry.score}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scores;
