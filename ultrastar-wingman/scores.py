import datetime
import time
from typing import List, Optional, Tuple
import sqlite3

import config
from song import Song
from users.players import Player

_conn = sqlite3.connect(f'file:{config.usdx_ultrastar_db}?mode=ro', uri=True)


async def score_with_player(name: str, score: int, date: int):
    player = await Player.get_by_name(name)
    if player is not None:
        return {
            "player_id": player.id,
            "player": player.name,
            "registered": player.user is not None,
            "score": score,
            "date": date
        }
    else:
        return {
            "player_id": "",
            "player": name,
            "registered": False,
            "score": score,
            "date": date
        }


async def get_song_scores(title: str, artist: str):
    """
    Fetches all scores for a given Song

    :return: The stats
    """

    query = """
        SELECT Player, Score, Date
        FROM us_scores
        JOIN us_songs ON us_scores.SongId = us_songs.ID
        WHERE us_songs.Title LIKE ? AND us_songs.Artist LIKE ?;
    """

    cursor = _conn.cursor()

    try:
        # There are some null characters after each string for some reason :/
        # This was fixed by using like instead of equals
        cursor.execute(query, (title + "%", artist + "%"))

        rows = cursor.fetchall()

        return [
            await score_with_player(player.rstrip('\u0000'), score, date) for player, score, date in rows
        ]
    finally:
        cursor.close()


class Session:
    """
    A session which is determined by the timestamps from the scores
    """

    sessions: List['Session'] = []
    current_session: Optional['Session'] = None

    @classmethod
    def init_sessions(cls):
        """
        Initialize the sessions by going through the scores file and creating sections depending on the timestamps

        :return: The sessions
        """

        # Create a cursor object using the cursor() method
        cursor = _conn.cursor()

        # Define your SQL query
        query = """
            SELECT Date
            FROM us_scores
            ORDER BY Date;
        """

        try:
            # Execute the SQL query
            cursor.execute(query)

            # Fetch all results
            rows = cursor.fetchall()

            sessions = []

            last_date = -1

            for (date,) in rows:
                if not sessions:
                    sessions.append(Session(session_id=len(sessions), start_date=date))

                # consider it a new session if more than 6 hours passed
                if last_date != -1 and date - last_date > 6 * 60 * 60:
                    sessions[-1].end_date = last_date
                    sessions.append(Session(session_id=len(sessions), start_date=date))

                last_date = date

            if time.time() - last_date > 6 * 60 * 60:
                # The current session is a new session
                if sessions:
                    sessions[-1].end_date = last_date
                sessions.append(Session(session_id=len(sessions), start_date=round(time.time())))

            cls.sessions = sessions
            cls.current_session = sessions[-1]
            return sessions
        finally:
            # Close the cursor and connection to so the SQLite library can clean up
            cursor.close()

    def __init__(self, session_id: int, start_date: int, end_date: Optional[int] = None):
        """
        Initialize the sessions with the start and end dates

        :param start_date: The start date
        :param end_date: The end date
        """

        self.id = session_id
        self.start_date = start_date
        self.end_date = end_date

    def __str__(self):
        return f"Session(start_date={datetime.datetime.fromtimestamp(self.start_date).isoformat()}, end_date={datetime.datetime.fromtimestamp(self.end_date).isoformat() if self.end_date else 'None'})"

    def __repr__(self):
        return str(self)

    async def get_scores(self, just_latest=False) -> List[dict]:
        """
        Get the scores for this session

        :param just_latest: If only the scores for the latest song should be gotten
        :return: The colors
        """

        # Create a cursor object using the cursor() method
        cursor = _conn.cursor()

        if just_latest:
            # Get only the latest score in the session
            query = """
                SELECT ID, Artist, Title, Difficulty, Player, Score, Date
                FROM us_songs
                JOIN us_scores ON us_songs.ID = us_scores.SongID
                WHERE Date = (SELECT MAX(Date) FROM us_scores WHERE Date >= ? and Date <= ?)
                ORDER BY Date DESC;
            """
        else:
            # Get all scores in the session
            query = """
                SELECT ID, Artist, Title, Difficulty, Player, Score, Date
                FROM us_songs
                JOIN us_scores ON us_songs.ID = us_scores.SongID
                WHERE Date >= ? and Date <= ?
                ORDER BY Date;
            """
        try:
            # Execute the SQL query
            cursor.execute(query, (self.start_date, self.end_date or int(2 * time.time())))

            # Fetch all results
            rows = cursor.fetchall()

            data = [{
                **await score_with_player(player.rstrip('\u0000'), score, date),
                "usdx_id": usdx_id,
                "artist": artist.rstrip('\u0000'),
                "title": title.rstrip('\u0000'),
            } for usdx_id, artist, title, difficulty, player, score, date in rows]

            for score in data:
                song = Song.get_song_by_artist_and_title(score["artist"], score["title"])
                if song is not None:
                    score["song_id"] = song.id
                else:
                    score["song_id"] = ""

            return data
        finally:
            # Close the cursor and connection to so the SQLite library can clean up
            cursor.close()

    def to_json(self) -> dict:
        """
        Convert the sessions to a JSON object
        :return: The json data
        """

        return {
            "id": self.id,
            "start_time": self.start_date,
            "end_time": self.end_date or -1
        }


async def get_session_data(session_id: Optional[int] = None) -> Optional[dict]:
    """
    Gets the data for the session with the given id

    :param session_id: The id for the session (the index in the array)
    :return: The sessions data or None if the session is unknown
    """

    if session_id is None:
        session = Session.current_session
    else:
        if session_id >= len(Session.sessions):
            return None
        session = Session.sessions[session_id]

    return {
        "session": session.to_json(),
        "scores": await session.get_scores()
    }


_latest_new_score_fetched = -1

latest_score: Optional[dict] = None


async def get_new_latest_scores_from_db() -> Optional[List[dict]]:
    """
    Gets the latest scores for the current session.
    If no new scores are available, None will be returned.

    :return: The scores
    """

    scores = await Session.current_session.get_scores(just_latest=True)
    if scores:
        global _latest_new_score_fetched

        if _latest_new_score_fetched != scores[0]["date"]:
            _latest_new_score_fetched = scores[0]["date"]
            return scores


def init_sessions():
    Session.init_sessions()


def get_sessions():
    return [session.to_json() for session in Session.sessions]
