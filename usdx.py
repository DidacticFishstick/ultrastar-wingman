import logging
import os.path
import re
import hashlib
import shutil
import threading

import pyautogui
import keyboard

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

_enter_names_lock = threading.Lock()

def enter_names(players):
    with _enter_names_lock:
        logging.info("Entering player names")

        max_len_to_delete = max(*list(len(p) for p in players), 10)

        # set number of players
        pyautogui.press('left', presses=6)
        pyautogui.press('right', presses=len(players) - 1)

        pyautogui.press('down')

        for player in players:
            pyautogui.press('down', presses=2)

            for i in range(max_len_to_delete):
                keyboard.press_and_release('backspace')
            # pyautogui.press('backspace', presses=max_len_to_delete)
            pyautogui.write(player)

            pyautogui.press('up', presses=2)
            pyautogui.press('right')

        pyautogui.press('up')


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
