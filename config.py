import argparse
import configparser
import os.path
from pathlib import Path

_parser = argparse.ArgumentParser(description="Didactic Fishstick")
_parser.add_argument("-c", "--config", help="The config file (default: ./config.ini)", default="./config.ini", required=False)

_args = _parser.parse_args()

_config = configparser.RawConfigParser()
_config.read(_args.config)

usdx_path = Path(_config.get("USDX", "usdx_path")).expanduser()
usdx_config_file = Path(_config.get("USDX", "usdx_config_file")).expanduser()
usdx_songs_dir = Path(_config.get("USDX", "usdx_songs_dir")).expanduser()
usdx_avatars_dir = Path(_config.get("USDX", "usdx_avatars_dir")).expanduser()


usdb_user = _config.get("USDB", "username")
usdb_pass = _config.get("USDB", "password")

setup_colors = _config.get("SETUP", "colors").split(",")

players_file = _config.get("OTHER", "players_file")
youtube_dl = _config.get("OTHER", "youtube_dl")
ffmpeg = _config.get("OTHER", "ffmpeg")
