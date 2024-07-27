import asyncio
import filecmp
import glob
import logging
import os.path
import re
import hashlib
import shutil
import sys
from typing import Optional, List

import config

colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "orange",
    "pink",
    "violet",
    "brown",
    "gray",
    "dark_blue",
    "sky",
    "cyan",
    "flame",
    "orchid",
    "harlequin",
    "green_yellow"
]

process = None
process_lock = asyncio.Lock()


async def _monitor_process(p, callback, song: Optional['Song']):
    """
    Waits for the given process to exit before calling the given callback.

    :param p: The process to monitor.
    :param callback: The callback to call.
    :param callback: The callback to call.
    """

    await p.wait()
    await callback(song)


async def start(song: Optional['Song'] = None, kill_previous=False, callback=None):
    """
    Starts ultrastar wingman with an optional list of parameters.
    If ultrastar wingman is already running, the old proces will be killed first

    :param song: Optional song to start.
    :param kill_previous: If the previous process should be killed (if it is still running).
    :param callback: A callback function to call when the process ends.
    """

    global process

    params = []
    if song is not None:
        params = ["-SongPath", str(song.directory)]

    async with process_lock:
        try:
            if not kill_previous and (process and process.returncode is None):
                logging.info(f"Not starting USDX as it is already running")
                return

            # Kill the previous process
            if kill_previous and (process and process.returncode is None):
                try:
                    process.kill()
                    logging.info(f"USDX killed")
                except:
                    logging.exception("Failed to kill USDX")

            # start the new process
            process = await asyncio.create_subprocess_exec(
                str(config.usdx_path),
                *params,
                stdout=None,
                stderr=None,
                creationflags=(0x08000000 if sys.platform == 'win32' else 0)  # CREATE_NO_WINDOW for Windows because the process does not exit otherwise - thanks Obama!
            )

            # configure callback
            if callback is not None:
                asyncio.create_task(_monitor_process(process, callback, song))

            logging.info(f"USDX started")
        except:
            logging.exception("Failed to start USDX")


async def kill():
    """
    Kills any processes of ultrastar deluxe that are currently running.
    """

    global process

    async with process_lock:
        if process and process.returncode is None:
            try:
                process.kill()
                logging.info(f"USDX killed")
            except:
                logging.exception("Failed to kill USDX")


def calculate_md5(file_path):
    """
    Calculate and return the MD5 hash of a file.

    :param file_path: path to the file for which the MD5 hash needs to be calculated.
    :return: a string representing the MD5 hash.
    """
    hash_md5 = hashlib.md5()

    # Open the file in binary mode and read chunks
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)

    # Return the hex representation of the digest
    return hash_md5.hexdigest().upper()


def replace_in_config(file_path, replace):
    with open(file_path, "r") as file:
        content = file.read()

    for header, settings in replace.items():
        for key, value in settings.items():
            def replacer(match):
                return f"{match.group(1)}{value}"

            content = re.sub(rf'(\[{header}\][^\[]*{key}=)[^\n]*', replacer, content, count=1)

    with open(file_path, "w") as file:
        file.write(content)


def _copy_and_replace_avatar(player_id, src_dir, dest_dir) -> Optional[str]:
    """
    Copies the player avatar (<player_id>.*) from the src_dir to the dest_dir.
    Any previous player avatar (<player_id>.*) will be replaced / deleted.
    If no src is found, any dest will be deleted as well

    :param player_id: The id of the player
    :param src_dir: The src for the avatars
    :param dest_dir: The destination dir for the avatars
    :return: The path if a file was copied or None otherwise
    """

    # Define the pattern for the source files
    src_pattern = os.path.join(src_dir, f"{player_id}.*")

    # Get the list of files matching the pattern in src_dir
    src_files = glob.glob(src_pattern)

    # Define the pattern for the destination files
    dest_pattern = os.path.join(dest_dir, f"{player_id}.*")

    # Delete any existing files in dest_dir that match the pattern
    for file in glob.glob(dest_pattern):
        os.remove(file)

    # If no files match the pattern in src_dir, return False
    if not src_files:
        return

    # Copy the found file(s) from src_dir to dest_dir
    for src_file in src_files:
        logging.info(f"Copying avatar for '{player_id}")
        shutil.copy(src_file, dest_dir)

    # Check if the file now exists in dest_dir
    dest_files = glob.glob(dest_pattern)

    # Return the path of the copied file, otherwise None
    return dest_files[0] if dest_files else None


def change_config(players: List[Optional['Player']]):
    """
    Sets the colors, avatars and players in the usdx config

    :param players: The players to set
    """

    logging.info("Changing USDX config")

    # remove trailing None from players
    while players and players[-1] is None:
        players.pop()

    n_players = min(len(config.setup_colors), len(players))

    settings = {
        "Game": {
            "Players": n_players,
        },
        "Name": {},
        "PlayerColor": {},
        "PlayerAvatar": {},
        "Advanced": {
            "OnSongClick": "Select Players"
        }
    }

    # copy avatars into USDX directory
    from main import SCRIPT_BASE_PATH
    for avatar in os.listdir(os.path.join(SCRIPT_BASE_PATH, "./avatars")):
        file_path = os.path.join(SCRIPT_BASE_PATH, "./avatars", avatar)

        # Check if it's a file and not a directory
        if os.path.isfile(file_path):
            # Copy each file to the destination directory
            shutil.copy(file_path, config.usdx_avatars_dir)

    for i, (color, player) in enumerate(zip(config.setup_colors, players[:len(config.setup_colors)])):
        custom_avatar_path = None
        if player is not None:
            custom_avatar_path = _copy_and_replace_avatar(players[i].id, config.users_avatars_dir, config.usdx_avatars_dir)

        if player is not None:
            settings["Name"][f"P{i + 1}"] = player.name
        else:
            settings["Name"][f"P{i + 1}"] = "-"

        if color in colors:
            settings["PlayerColor"][f"P{i + 1}"] = colors.index(color) + 1
            settings["PlayerAvatar"][f"P{i + 1}"] = calculate_md5(custom_avatar_path or os.path.join(config.usdx_avatars_dir, f'cat_{color}.jpg'))
        else:
            settings["PlayerColor"][f"P{i + 1}"] = 14
            settings["PlayerAvatar"][f"P{i + 1}"] = calculate_md5(custom_avatar_path or os.path.join(config.usdx_avatars_dir, 'cat_rainbow.jpg'))

    replace_in_config(config.usdx_config_file, settings)
