import argparse
import configparser
import os
import shutil
from pathlib import Path
from appdirs import user_config_dir

SCRIPT_BASE_PATH = os.path.abspath(os.path.dirname(__file__))

_parser = argparse.ArgumentParser(description="Ultrastar Wingman")

_default_config = "./config.ini"
if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
    os.makedirs(os.path.join(user_config_dir(), "Ultrastar Wingman"), exist_ok=True)
    _default_config = os.path.join(user_config_dir(), "Ultrastar Wingman", "config.ini")

_parser.add_argument("-c", "--config", help="The config file (default: ./config.ini)", default=_default_config, required=False)

_args = _parser.parse_args()

file_name = _args.config

if not os.path.isfile(file_name):
    if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
        shutil.copy(os.path.join(SCRIPT_BASE_PATH, "config.ini.windows_installation_template"), file_name)

print(f"Using config '{file_name}'")

_config = configparser.RawConfigParser()
_config.read(file_name)

usdx_path = Path(_config.get("USDX", "usdx_path")).expanduser()
usdx_config_file = Path(_config.get("USDX", "usdx_config_file")).expanduser()
usdx_songs_dir = Path(_config.get("USDX", "usdx_songs_dir")).expanduser()
usdx_avatars_dir = Path(_config.get("USDX", "usdx_avatars_dir")).expanduser()

usdb_user = _config.get("USDB", "username")
usdb_pass = _config.get("USDB", "password")
usdb_downloader_count = int(_config.get("USDB", "downloader_count", fallback=4))

setup_colors = _config.get("SETUP", "colors").split(",")

if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
    players_file = os.path.join(user_config_dir(), "Ultrastar Wingman", "players.txt")
    youtube_dl = os.path.join(SCRIPT_BASE_PATH, "executables", "yt-dlp.exe")
    ffmpeg = os.path.join(SCRIPT_BASE_PATH, "executables", "ffmpeg.exe")
else:
    players_file = _config.get("OTHER", "players_file")
    youtube_dl = _config.get("OTHER", "youtube_dl")
    ffmpeg = _config.get("OTHER", "ffmpeg")


def save_usdb_credentials(username, password):
    _config['USDB'] = {'username': username, 'password': password}
    with open(file_name, 'w') as configfile:
        _config.write(configfile)
