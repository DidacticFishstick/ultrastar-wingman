import argparse
import configparser
import os.path

_parser = argparse.ArgumentParser(description="Didactic Fishstick")
_parser.add_argument("-c", "--config", help="The config file (default: ./config.ini)", default="./config.ini", required=False)

_args = _parser.parse_args()

_config = configparser.RawConfigParser()
_config.read(_args.config)

usdx_base_path = _config.get("USDX", "base_path")
usdx_path = os.path.join(usdx_base_path, "ultrastardx.exe")
usdx_config_file = os.path.join(usdx_base_path, "config.ini")
usdx_songs_dir = os.path.join(usdx_base_path, "songs")
usdx_avatars_dir = os.path.join(usdx_base_path, "avatars")

usdb_user = _config.get("USDB", "username")
usdb_pass = _config.get("USDB", "password")

setup_colors = _config.get("SETUP", "colors").split(",")

players_file = _config.get("OTHER", "players_file")
youtube_dl = _config.get("OTHER", "youtube_dl")
ffmpeg = _config.get("OTHER", "ffmpeg")
