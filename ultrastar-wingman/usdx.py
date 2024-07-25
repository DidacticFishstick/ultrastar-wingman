import asyncio
import logging
import os.path
import re
import hashlib
import shutil
import sys
from typing import Optional

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


def change_config(colors):
    logging.info("Changing USDX config")

    settings = {
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

    for i, color in enumerate(colors):
        if color in colors:
            # TODO: colors do not fit
            settings["PlayerColor"][f"P{i + 1}"] = colors.index(color) + 1
            settings["PlayerAvatar"][f"P{i + 1}"] = calculate_md5(os.path.join(config.usdx_avatars_dir, f'cat_{color}.jpg'))
        else:
            settings["PlayerColor"][f"P{i + 1}"] = 14
            settings["PlayerAvatar"][f"P{i + 1}"] = calculate_md5(os.path.join(config.usdx_avatars_dir, 'cat_rainbow.jpg'))

    replace_in_config(config.usdx_config_file, settings)
