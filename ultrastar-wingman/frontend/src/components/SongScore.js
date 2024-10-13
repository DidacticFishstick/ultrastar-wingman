// components/SongScore.js

import React from 'react';
import './SongScore.css'; // Importing the CSS for styling

const SongScore = ({song, scores, className, style}) => {
    // Combine the passed className with the default classes
    const tileClassNames = `song-score ${className || ''}`;

    console.log("song", song);
    console.log("scores", scores);

    const sortedScores = scores.sort((a, b) => b.score - a.score);

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
        <div className={"player-scores"}>
            {sortedScores.map((score) => (
                <div>
                    <span className={"avatar"}>
                        <span style={{backgroundImage: `url('/api/players/registered/${score.player_id}/avatar')`}}/>
                    </span>
                    <div className={"player-score"} key={score.id}>
                        <span className={"percent"} style={{width: `${score.score / 100}%`}}></span>
                        <label className={"name"}>{score.name}</label>
                        <label className={"score"}>{score.score}</label>
                    </div>
                </div>
            ))}
        </div>
    </div>;
};

export default SongScore;
