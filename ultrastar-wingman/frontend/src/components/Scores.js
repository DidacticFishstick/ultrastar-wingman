// Scores.js
import React, {useEffect, useRef, useState} from "react";
import {MdExpandMore, MdNumbers} from "react-icons/md";
import {TbMathAvg} from "react-icons/tb";
import {FaLongArrowAltUp, FaLongArrowAltDown} from "react-icons/fa";
import {PiMicrophoneStage} from "react-icons/pi";
import {ScoresApi} from "../api/src";
import Spinner from "./Spinner";
import Boxplot from "./Boxplot";
import './Scores.css';
import Tile from "./Tile";
import RadioButton from "./RadioButton";
import {FaSearch} from "react-icons/fa";
import Input from "./Input";
import Histogramm from "./Histogramm";

function Scores() {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scoreGroups, setScoreGroups] = useState('player');
    const [scoreSort, setScoreSort] = useState('best-score');
    const [songSearchTerm, setSongSearchTerm] = useState('');

    const inputRef = useRef();

    const api = new ScoresApi();

    useEffect(() => {
        const fetchSessions = async () => {
            // TODO: helpers.js
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

    const filteredScores = scores.filter(score =>
        score.title.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        score.artist.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        score.player.toLowerCase().includes(songSearchTerm.toLowerCase())
    );

    const groupedData = filteredScores.reduce((acc, item) => {
        // group by song or player
        const key = (scoreGroups === "song") ? `${item.usdx_id}-${item.title}` : `${item.player}`;

        if (!acc[key]) {
            if (scoreGroups === "song") {
                acc[key] = {
                    song_id: item.song_id,
                    title: item.title,
                    artist: item.artist,
                    scores: []
                };
            } else {
                acc[key] = {
                    player: item.player,
                    scores: [],
                }
            }
        }
        if (scoreGroups === "song") {
            acc[key].scores.push({
                player: item.player,
                score: item.score
            });
        } else {
            acc[key].scores.push({
                song_id: item.song_id,
                title: item.title,
                artist: item.artist,
                score: item.score
            });
        }
        return acc;
    }, {});
    const groupedDataList = Object.values(groupedData);

    // calculate some additional data and sort the scores
    const calculateAverageScore = (scores) => Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);
    groupedDataList.forEach(song => {
        song.scores.sort((a, b) => b.score - a.score); // Sort descending by score
        song.bestScore = song.scores[0].score;
        song.worstScore = song.scores[song.scores.length - 1].score;
        song.averageScore = calculateAverageScore(song.scores);
    });

    // sort data
    let sortedData;
    switch (scoreSort) {
        case 'avg-score':
            sortedData = groupedDataList.sort((a, b) => {
                if (a.averageScore < b.averageScore) return 1;
                if (a.averageScore > b.averageScore) return -1;
                return 0;
            });
            break;
        case 'best-score':
            sortedData = groupedDataList.sort((a, b) => {
                if (a.bestScore < b.bestScore) return 1;
                if (a.bestScore > b.bestScore) return -1;
                return 0;
            });
            break;
        case 'worst-score':
            sortedData = groupedDataList.sort((a, b) => {
                if (a.worstScore < b.worstScore) return -1;
                if (a.worstScore > b.worstScore) return 1;
                return 0;
            });
            break;
        case 'alphabetically':
        default:
            sortedData = groupedDataList.sort((a, b) => {
                if (a.player.toLowerCase() < b.player.toLowerCase()) return -1;
                if (a.player.toLowerCase() > b.player.toLowerCase()) return 1;
                if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
                if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            });
            break;
    }

    // create the list
    let scoresListDiv;
    switch (scoreGroups) {
        // TODO: no groups
        case 'song':
            scoresListDiv = <div className={"grouped-songs"}>
                {sortedData.map((song, index) => (
                    <div key={index} className={"score-group song"}>
                        <div className={'header'} onClick={(e) => {
                            e.currentTarget.classList.toggle("expanded")
                        }}>
                            <div className={"cover"} style={{backgroundImage: `url('/api/songs/${song.song_id}/cover')`}}></div>
                            <div className={'details'}>
                                <div className={'title'}>{song.artist} | {song.title}</div>
                                <div className={'data'}>
                                    <MdNumbers/>
                                    <span>{song.scores.length}</span>
                                    <FaLongArrowAltUp/>
                                    <span>{`${song.scores[0].player} (${song.scores[0].score})`}</span>
                                    <FaLongArrowAltDown/>
                                    <span>{`${song.scores[song.scores.length - 1].player} (${song.scores[song.scores.length - 1].score})`}</span>
                                    <TbMathAvg/>
                                    <span>{song.averageScore}</span>
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
            </div>;
            break
        case 'player':
            scoresListDiv = <div className={"grouped-songs"}>
                {sortedData.map((player, index) => (
                    <div key={index} className={"score-group player"}>
                        <div className={'header'} onClick={(e) => {
                            e.currentTarget.classList.toggle("expanded")
                        }}>
                            <div className={"place"}>
                                {/*TODO: Might be the same place as the one before*/}
                                <span>{`${index + 1}.`}</span>
                            </div>
                            <div className={'details'}>
                                <div className={'title'}>{player.player}</div>
                                <div className={'data'}>
                                    <MdNumbers/>
                                    <span>{player.scores.length}</span>
                                    <FaLongArrowAltUp/>
                                    <span>{player.scores[0].score}</span>
                                    <FaLongArrowAltDown/>
                                    <span>{player.scores[player.scores.length - 1].score}</span>
                                    <TbMathAvg/>
                                    <span>{player.averageScore}</span>
                                </div>
                            </div>
                            <div className={"expand"}>
                                <MdExpandMore/>
                            </div>
                        </div>
                        <div>
                            <h3>Score Distribution</h3>
                            <Histogramm data={player.scores}/>

                            <h3>Sung Songs</h3>
                            <div className={"player-scores"}>
                                {player.scores.map((score, idx) => (
                                    <div key={index} className={"score-group player-song"}>
                                        <div className={'header'} onClick={(e) => {
                                            e.currentTarget.classList.toggle("expanded")
                                        }}>
                                            <div className={"cover"} style={{backgroundImage: `url('/api/songs/${score.song_id}/cover')`}}></div>
                                            <div className={'details'}>
                                                <div className={'title'}>{score.artist} | {score.title}</div>
                                                <div className={'data'}>
                                                    <PiMicrophoneStage/>
                                                    <span>{score.score}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>;
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
            {scoresListDiv}
        </div>
    );
}

export default Scores;
