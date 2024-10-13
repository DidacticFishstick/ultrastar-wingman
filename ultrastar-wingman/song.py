import asyncio
import json
import logging
import os
import random
import re
import shutil
import tempfile
import time
import uuid
from functools import lru_cache
from pathlib import Path

import chardet
from typing import Optional, List, Dict

import eyed3
import httpx
from bs4 import BeautifulSoup
from tqdm import tqdm

import config
import usdb
import ws
import usdx


class DownloadException(Exception):
    pass


class Song:
    songs = {}
    usdb_ids = set()
    active_song_lock = asyncio.Lock()
    active_song: Optional['Song'] = None

    SONG_COPY_DIR = "ULTRASTAR_WINGMAN_SONG_COPY"

    @staticmethod
    def create_valid_dir_name(s):
        # Remove invalid characters
        s = re.sub(r'[<>:"/\\|?*]', '', s)

        # Replace spaces with underscores
        # s = s.replace(' ', '_')

        # Truncate to a reasonable length to avoid exceeding max path lengths
        s = s[:255]

        # Ensure the name isn't a reserved name in Windows
        reserved_names = ["CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"]
        if s.upper() in reserved_names:
            s = "_" + s

        return s

    @staticmethod
    def get_data_from_txt(txt: str) -> Optional[Dict[str, str]]:
        """
        Gets the following data from a txt file:
        - title
        - artist
        - cover
        - mp3
        and returns it as a dictionary.

        :param txt: The txt file content
        :return: The data
        """

        data = {}

        for key, identifier in [
            ("title", "TITLE"),
            ("artist", "ARTIST"),
            ("cover", "COVER"),
            ("mp3", "MP3")
        ]:
            match = re.search(fr'#{identifier}:(.*)\n', txt)
            if match:
                data[key] = match.group(1)

        return data

    @classmethod
    def load_songs(cls):
        start_time = time.time()

        for song_dir in [config.usdx_songs_dir] + config.usdx_additional_songs_dirs:
            logging.info(f"Loading songs from {song_dir}")
            if not (os.path.exists(song_dir) and os.path.isdir(song_dir)):
                logging.warning(f"{song_dir} is not a directory")
                continue
            for subdir in tqdm(os.listdir(song_dir)):
                subdir_path = str(os.path.join(song_dir, subdir))

                if not os.path.isdir(subdir_path):
                    continue

                try:
                    # if a wingman.json exists, use the data from there
                    if cls.song_from_metadata(subdir_path):
                        continue

                    # maybe get the usdb_id from the deprecated usdb_data.json if it exists
                    usdb_id = cls.load_deprecated_usdb_id(subdir_path)

                    # search for txt files
                    txt_files = [f for f in os.listdir(subdir_path) if f.endswith('.txt')]

                    if not txt_files:
                        continue

                    txt_path = os.path.join(subdir_path, txt_files[0])

                    with open(txt_path, 'rb') as file:
                        encoding = chardet.detect(file.read())['encoding']

                    # if encoding != 'utf-8':
                    #     logging.warning(f"Wrong encoding. Is {encoding} instead of utf-8 for '{os.path.join(subdir_path, txt_files[0])}'")

                    with open(txt_path, 'r', encoding=encoding) as file:
                        txt = file.read()

                        txt_data = cls.get_data_from_txt(txt)

                        if txt_data["title"] is None:
                            logging.warning(f"No title for {subdir_path}")
                            continue
                        if txt_data["artist"] is None:
                            logging.warning(f"No artist for {subdir_path}")
                            continue

                    song = cls(directory=subdir_path, usdb_id=usdb_id, **txt_data)
                    # save the data to skip loading everything again next time
                    song.save_metadata()
                except:
                    logging.exception(f"Could not process song in '{subdir_path}'")

        logging.info(f"Finished loading all songs in {round(time.time() - start_time, 2)} seconds")

    @classmethod
    def song_from_metadata(cls, directory) -> Optional['Song']:
        """
        Tries to retrieve the song metadata from a wingman.json.
        Will return the song if the data is enough.

        :param directory: directory to search for metadata files
        :return: The song if the metadata file was found and complete, None otherwise
        """

        path = os.path.join(directory, "wingman.json")

        if os.path.isfile(path):
            with open(path, "r") as file:
                data = json.load(file)

            # that check that all the required data is present
            if all({key: (key in data) for key in ["title", "artist", "cover", "mp3"]}.values()):
                return cls(directory=directory, **data)

    @classmethod
    def load_deprecated_usdb_id(cls, directory) -> Optional[str]:
        """
        Tries to get the usdb id from the deprecated usdb_data.json

        :param directory: directory to search for the file
        :return: The id if the file was found, None otherwise
        """

        path = os.path.join(directory, "usdb_data.json")

        if os.path.isfile(path):
            with open(path, "r") as file:
                usdb_data = json.loads(file.read())
                return str(usdb_data.get("id"))

    @classmethod
    async def download(cls, id) -> 'Song':
        response = await usdb.session.post(f"https://usdb.animux.de/index.php?link=gettxt&id={id}", data={"wd": "1"})

        if not 200 <= response.status_code < 300:
            raise httpx.HTTPStatusError(f"failed to get txt for {id} ", response=response, request=response.request)

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract the value of the input element with the name "txt"
        input_element = soup.find('input', {'name': 'txt'})

        if input_element:
            txt = input_element['value'].replace("\r\n", "\n")
        else:
            raise DownloadException(f"txt for {id} not found on usdb.animux.de. Are you logged in?")

        match = re.search(r'#TITLE:(.*)\n', txt)
        if match:
            title = match.group(1)
        else:
            raise DownloadException("missing name")

        match = re.search(r'#ARTIST:(.*)\n', txt)
        if match:
            artist = match.group(1)
        else:
            raise DownloadException("missing artist")

        match = re.search(r'#VIDEO:(.*)\n', txt)
        if match:
            video = match.group(1)
        else:
            raise DownloadException("missing video")

        await ws.broadcast(ws.MessageType.download_started, {
            "usdb_id": id,
            "title": title,
            "artist": artist
        })

        if id is None:
            sanitized_name = cls.create_valid_dir_name(f"{artist} - {title}")
        else:
            sanitized_name = cls.create_valid_dir_name(f"{artist} - {title} ({id})")

        directory = os.path.join(config.usdx_songs_dir, sanitized_name)

        if os.path.exists(directory):
            raise DownloadException(f"directory '{directory}' exists")

        logging.info(f"Saving {artist} - {title} ({id}) to {directory}")

        with tempfile.TemporaryDirectory() as tempdir:
            with open(os.path.join(tempdir, f"{sanitized_name}.txt"), "w+", encoding='utf-8') as file:
                file.writelines("#VIDEO:video.mp4\n")
                file.writelines("#MP3:song.mp3\n")
                file.writelines("#COVER:cover.jpg\n")
                # TODO: Background
                # file.writelines("#BACKGROUND:background.jpg\n")
                for line in txt.split("\n"):
                    if not any(line.startswith(s) for s in ["#VIDEO", "#MP3", "#COVER", "#BACKGROUND"]):
                        file.writelines(line + "\n")

            match = re.search(r'[va]=([a-zA-Z0-9_-]+)', video)
            if match:
                url = f"https://www.youtube.com/watch?v={match.group(1)}"
            else:
                raise DownloadException(f"no video url found in txt")

            process = await asyncio.create_subprocess_exec(
                "curl", "-o", "cover.jpg", f"https://usdb.animux.de/data/cover/{id}.jpg",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=tempdir
            )
            stdout, stderr = await process.communicate()

            if process.returncode != 0:
                raise DownloadException(f"cover download failed with code {process.returncode}, stdout: {stdout.decode()}, stderr: {stderr.decode()}")

            # print(tempdir)
            # import time
            # time.sleep(200)

            # try:
            #     subprocess.run(["curl", "-o", "cover.jpg", f"https://usdb.animux.de/data/cover/{id}.jpg"], cwd=tempdir, check=True)
            # except Exception as e:
            #     raise DownloadException(f"cover download failed: {e}")

            process = await asyncio.create_subprocess_exec(
                config.youtube_dl, "-o", "video.mp4", "--format", "mp4", url,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=tempdir
            )
            stdout, stderr = await process.communicate()

            if process.returncode != 0:
                raise DownloadException(f"youtube-dl failed with code {process.returncode}, stdout: {stdout.decode()}, stderr: {stderr.decode()}")

            process = await asyncio.create_subprocess_exec(
                config.ffmpeg, "-i", "video.mp4", "-vn", "-acodec", "libmp3lame", "-ac", "2", "-ab", "160k", "-ar", "48000", "song.mp3",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=tempdir
            )
            stdout, stderr = await process.communicate()

            if process.returncode != 0:
                raise DownloadException(f"ffmpeg failed with code {process.returncode}, stdout: {stdout.decode()}, stderr: {stderr.decode()}")

            os.makedirs(directory)

            for file_name in os.listdir(tempdir):
                source = os.path.join(tempdir, file_name)
                destination = os.path.join(directory, file_name)
                shutil.move(source, destination)

        song = cls(directory, title, artist, usdb_id=id, cover="cover.jpg", mp3="song.mp3")
        song.save_metadata()
        return song

    @classmethod
    def song_list(cls) -> List[dict]:
        return [s.to_json() for s in cls.songs.values()]

    @classmethod
    def get_song_by_id(cls, id) -> Optional['Song']:
        """
        Returns the song with the given ID.
        Use id "random" to get a random song.
        Use id "current" to get the currently playing song.

        :param id: The song id
        :return: The song object or None if the song does not exist
        """

        if id == "random" and cls.songs:
            return random.choice(list(cls.songs.values()))

        if id == "current" and cls.songs:
            return cls.active_song

        return cls.songs.get(str(id))

    @classmethod
    @lru_cache(512)
    def get_song_by_artist_and_title(cls, artist: str, title: str) -> Optional['Song']:
        """
        Searches through the songs for the song with the given artist and title.
        If multiple songs are found, returns the first one.
        Returns None if no song was found.
        This is needed for the scores as Ultrastar Deluxe is not bothered to save any good identifier for the scores

        :param artist: The artist
        :param title: The title
        :return: The song or None if no song was found
        """

        for song in cls.songs.values():
            if song.artist == artist and song.title == title:
                return song
        return None

    @staticmethod
    def get_mp3_length(filename):
        audiofile = eyed3.load(filename)
        duration = audiofile.info.time_secs
        return duration

    @classmethod
    async def _on_song_end(cls, song: 'Song'):
        """
        Callback to be used for the end of a song.

        :param song: The song that ended
        """

        async with cls.active_song_lock:
            if cls.active_song is not None and song.id == cls.active_song.id:
                cls.active_song = None

                # remove the temp song dir if it exists
                tmp_path = Path(config.usdx_songs_dir) / cls.SONG_COPY_DIR
                if tmp_path.exists():
                    shutil.rmtree(tmp_path)

                await ws.broadcast(ws.MessageType.active_song, {})
                import scores
                if new_scores := scores.get_new_latest_scores():
                    await ws.broadcast(ws.MessageType.new_scores, new_scores)

    @classmethod
    async def _sing_song(cls, song: 'Song', players: List[Optional['Player']], force=False, copy_to_main_songs_dir=False) -> bool:
        """
        Starts a new ultrastar deluxe process with the given song.
        If another song is currently active, the new song will not be started.

        If copy_to_main_songs_dir is set to True, the song will be copied to the default songs dir temporarily.
        If using -SongPath as a command line parameter and the given song is not in the default dir,
        all songs in the default dir are still loaded for some reason.
        So to avoid this, the songs are copied.

        :param song: The song to start
        :param players: The list of players
        :param force: If set to True, any currently playing song will be canceled
        :param copy_to_main_songs_dir: Moves the song to the main songs dir before starting
        :return: True if the given song was started, False otherwise
        """

        async with cls.active_song_lock:
            if not force and cls.active_song is not None:
                # There is already a song running
                logging.info(f"Not starting song as another one is already active")
                return False

            logging.info(f"Starting song {song} for {', '.join([p.name for p in players if p is not None])}")

            temp_song_dir = None
            if copy_to_main_songs_dir:
                temp_song_dir = cls._copy_to_main_songs_dir(song)

            usdx.change_config(players)

            await usdx.start(
                song=song,
                temp_song_dir=temp_song_dir,
                kill_previous=True,
                callback=cls._on_song_end
            )

            cls.active_song = song
            await ws.broadcast(ws.MessageType.active_song, cls.active_song.to_json())

        return True

    def __init__(self,
                 directory: str,
                 title: str,
                 artist: str,
                 id: Optional[str] = None,
                 usdb_id: Optional[str] = None,
                 cover: Optional[str] = None,
                 mp3: Optional[str] = None,
                 duration: Optional[float] = None,
                 **kwargs):
        """
        Creates a new song from the information found in the directory

        :param directory: The directory to the song directory
        :param title: The song title
        :param artist: The artist
        :param id: An optional global ID for the song (will be created if not given)
        :param usdb_id: An optional ID of the song on usdb.animux.de/
        :param cover: File name for the cover image
        :param mp3: File name for the mp3 file
        :param duration: An optional duration of the song in seconds (will be calculated if not given)
        :param kwargs: Additional arguments passed to the song constructor (not used currently)
        """

        self.directory = directory
        self.title = title
        self.artist = artist
        self.usdb_id = usdb_id
        self.cover = cover
        self.mp3 = mp3
        self.duration = duration or self.get_mp3_length(os.path.join(directory, mp3))

        if cover:
            self.cover_path = os.path.join(directory, cover)
        else:
            self.cover_path = None

        self.id = id or usdb_id or uuid.uuid4().hex

        self.songs[str(self.id)] = self

        if usdb_id is not None:
            self.usdb_ids.add(usdb_id)

    def __str__(self):
        if self.usdb_id is not None:
            return f"{self.title} - {self.artist} ({self.usdb_id})"
        return f"{self.title} - {self.artist}"

    def __repr__(self):
        if self.usdb_id is not None:
            return f"[Song '{self.title} - {self.artist}' ({self.usdb_id})]"
        return f"[Song '{self.title} - {self.artist}']"

    def is_path_sanitized(self) -> bool:
        """
        Check that the directory only has allowed characters.
        This is needed as USDX does not do well with special characters in song dirs.

        :return: If the path is already sanitized
        """

        pattern = re.compile(r'[^a-zA-Z0-9.,-_()+ ]')

        dir_name = os.path.basename(self.directory)

        new_dir_name = pattern.sub('', dir_name)

        return new_dir_name == dir_name

    def to_json(self):
        return {
            "directory": self.directory,
            "title": self.title,
            "artist": self.artist,
            "id": self.id,
            "usdb_id": self.usdb_id or "",
            "duration": self.duration
        }

    def save_metadata(self):
        """
        Saves the songs metadata into a json file.
        This file is used as a cache for the song metadata to skip loading all data next time
        """

        data = self.to_json()

        data.pop("directory")

        data["cover"] = self.cover
        data["mp3"] = self.mp3

        with open(os.path.join(self.directory, "wingman.json"), 'w') as file:
            json.dump(data, file, indent=4)

    def _copy_to_main_songs_dir(self):
        """
        Copies the song to the main songs dir.

        If using -SongPath as a command line parameter and the given song is not in the default dir,
        all songs in the default dir are still loaded for some reason.
        So to avoid this, the songs are copied.
        """

        src_path = Path(self.directory)
        dest_path = Path(config.usdx_songs_dir) / self.SONG_COPY_DIR

        # Ensure source directory exists
        if not src_path.exists() or not src_path.is_dir():
            raise FileNotFoundError(f"Source directory {self.directory} does not exist or is not a directory.")

        # Remove and recreate destination directory if it exists, or create it
        if dest_path.exists():
            shutil.rmtree(dest_path)
        dest_path.mkdir(parents=True, exist_ok=True)

        # Copy all contents from source to destination
        for item in src_path.iterdir():
            if item.is_dir():
                shutil.copytree(item, dest_path / item.name)
            else:
                shutil.copy2(item, dest_path / item.name)

        return str(dest_path)

    async def sing(self, players: List[Optional['Player']], force=False) -> bool:
        """
        Starts ultrastar deluxe with the song selected

        :param players: The list of player names
        :param force: If set to True, any currently playing song will be canceled
        :return: True if the given song was started, False otherwise
        """

        if Path(self.directory).resolve().is_relative_to(Path(config.usdx_songs_dir).resolve()) and self.is_path_sanitized():
            # This is already in the default songs dir and has a path that works for USDX
            return await self._sing_song(self, players, force=force)
        else:
            return await self._sing_song(self, players, force=force, copy_to_main_songs_dir=True)

