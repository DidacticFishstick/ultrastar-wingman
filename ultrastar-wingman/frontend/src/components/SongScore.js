// components/SongScore.js

import React from 'react';
import './SongScore.css';
import {MdNumbers} from "react-icons/md";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {TbMathAvg} from "react-icons/tb"; // Importing the CSS for styling

const SongScore = ({song, scores, allScores, className, style}) => {
    // Combine the passed className with the default classes
    const tileClassNames = `song-score ${className || ''}`;

    const sortedScores = scores.sort((a, b) => b.score - a.score);

    let justScores;
    let min;
    let max;
    let avg;
    let bestPlayers;
    let worstPlayers;

    if (allScores !== undefined) {
        // Extract scores
        justScores = allScores.map(item => item.score);

        // Calculate min, max, and average
        min = Math.min(...justScores);
        max = Math.max(...justScores);
        avg = Math.round(justScores.reduce((sum, score) => sum + score, 0) / justScores.length);

        // Get best and worst players
        bestPlayers = allScores.filter(item => item.score === max).map(item => item.player);
        worstPlayers = allScores.filter(item => item.score === min).map(item => item.player);
    }

    const singScoreLabel = score => {
        switch (true) {
            case (score <= 2009):
                return 'Tone Deaf';
            case (score <= 4009):
                return 'Amateur';
            case (score <= 5009):
                return 'Wannabe';
            case (score <= 6009):
                return 'Hopeful';
            case (score <= 7509):
                return 'Rising Star';
            case (score <= 8509):
                return 'Lead Singer';
            case (score <= 9009):
                return 'Superstar';
            case (score <= 10000):
                return 'Ultrastar';
            default:
                return "How did we get here?";
        }
    };

    // if there is the same number of occurrences of the highscore in the new scores as in all scores, there is a new highscore
    const newHighscore = allScores.filter(item => item.score === max).length === scores.filter(item => item.score === max).length;

    return <div className={tileClassNames} style={style}>
        <div className="song">
            <span className={"cover"}>
                <span style={{backgroundImage: `url('/api/songs/${song.id}/cover')`}}/>
            </span>
            <div>
                <label className={"title"}>{song.title}</label>
                <label className={"artist"}>{song.artist}</label>
            </div>
        </div>
        {allScores &&
            <div className={"stats"}>
                <div>
                    <FaLongArrowAltUp/>
                    <span>{`${max} (${bestPlayers.join(', ')})`}</span>
                </div>
                <div>
                    <TbMathAvg/>
                    <span>{avg}</span>
                </div>
                <div>
                    <FaLongArrowAltDown/>
                    <span>{`${min} (${worstPlayers.join(', ')})`}</span>
                </div>
            </div>
        }
        <div className={"player-scores"}>
            <div className={"stat-markers"}>
                <span></span>
                <div>
                    {min &&
                        <span className={"marker min"} style={{left: `${min / 100}%`}}>
                            <FaLongArrowAltDown/>
                        </span>
                    }
                    {avg &&
                        <span className={"marker avg"} style={{left: `${avg / 100}%`}}>
                            <TbMathAvg/>
                        </span>
                    }
                    {max &&
                        <span className={"marker max"} style={{left: `${max / 100}%`}}>
                            <FaLongArrowAltUp/>
                        </span>
                    }
                </div>
            </div>
            {sortedScores.map((score) => (
                <div>
                    <span className={"avatar"}>
                        <span style={{backgroundImage: `url('/api/players/registered/${score.player_id}/avatar')`}}/>
                    </span>
                    <div className={"player-score"} key={score.id}>
                        <span className={"percent"} style={{width: `${score.score / 100}%`}}></span>
                        <div>
                            <label className={"name"}>{score.player}</label>
                            <label className={"score-label"}>{singScoreLabel(score.score)}</label>
                        </div>
                        <div>
                            <label className={"score"}>{score.score}</label>
                            {newHighscore && score.score === max &&
                                <label className={"highscore"}>{"New Highscore"}</label>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>;
};

export default SongScore;
