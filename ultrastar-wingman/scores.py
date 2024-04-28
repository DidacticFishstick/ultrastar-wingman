import datetime
import time
from typing import List, Optional
import sqlite3

import config


class Session:
    """
    A session which is determined by the timestamps from the scores
    """

    _conn = sqlite3.connect(f'file:{config.usdx_ultrastar_db}?mode=ro', uri=True)

    sessions: List['Session'] = []
    current_session: Optional['Session'] = None

    @classmethod
    def init_sessions(cls):
        """
        Initialize the sessions by going through the scores file and creating sections depending on the timestamps

        :return: The sessions
        """

        # Create a cursor object using the cursor() method
        cursor = cls._conn.cursor()

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

    def get_scores(self) -> dict:
        """
        Get the scores for this session

        :return: The colors
        """

        # Create a cursor object using the cursor() method
        cursor = self._conn.cursor()

        # Define your SQL query
        query = """
            SELECT ID, Artist, Title, Difficulty, Player, Score, Date
            FROM us_songs
            JOIN us_scores ON us_songs.ID = us_scores.SongID
            WHERE Date >= ? and Date <= ?
            ORDER BY Date;
        """

        try:
            # Execute the SQL query
            cursor.execute(query, (self.start_date, self.end_date or int(time.time())))

            # Fetch all results
            rows = cursor.fetchall()

            # Convert query to json format
            # Start by defining the column names
            columns = ['usdx_id', 'artist', 'title', 'difficulty', 'player', 'score', 'date']

            # Create a list of dictionaries, each representing a row from the query
            json_array = [{columns[i]: value.rstrip('\u0000') if isinstance(value, str) else value for i, value in enumerate(row)} for row in rows]

            return json_array
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


def get_session_data(session_id: Optional[int] = None) -> Optional[dict]:
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
        "scores": session.get_scores()
    }


def init_sessions():
    Session.init_sessions()


def get_sessions():
    return [session.to_json() for session in Session.sessions]
