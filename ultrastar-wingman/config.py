import argparse
import configparser
import os
import shutil
from pathlib import Path
from appdirs import user_config_dir

SCRIPT_BASE_PATH = os.path.abspath(os.path.dirname(__file__))

_parser = argparse.ArgumentParser(description="Ultrastar Wingman")

config_dir = "."
if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
    config_dir = os.path.join(user_config_dir(), "Ultrastar Wingman")
    os.makedirs(config_dir, exist_ok=True)

users_dir = os.path.join(config_dir, "users")
users_avatars_dir = os.path.join(users_dir, "avatars")
os.makedirs(users_avatars_dir, exist_ok=True)

_parser.add_argument("-c", "--config", help="The config file (default: ./config.ini)", default=os.path.join(config_dir, "config.ini"), required=False)

_args = _parser.parse_args()

file_name = _args.config

if not os.path.isfile(file_name):
    if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
        shutil.copy(os.path.join(SCRIPT_BASE_PATH, "config.ini.windows_installation_template"), file_name)

print(f"Using config '{file_name}'")

_config = configparser.RawConfigParser()
_config.read(file_name)

usdx_base_path = Path(_config.get("USDX", "base_path", fallback=None)).expanduser()

if _usdx_path_raw := _config.get("USDX", "path", fallback=None):
    usdx_path = Path(_usdx_path_raw).expanduser()
else:
    usdx_path = usdx_base_path / "ultrastardx.exe"

if _usdx_config_file_raw := _config.get("USDX", "config_file", fallback=None):
    usdx_config_file = Path(_usdx_config_file_raw).expanduser()
else:
    usdx_config_file = usdx_base_path / "config.ini"

if _usdx_songs_dir_raw := _config.get("USDX", "songs_dir", fallback=None):
    usdx_songs_dir = Path(_usdx_songs_dir_raw).expanduser()
else:
    usdx_songs_dir = usdx_base_path / "songs"

# I know... :) This is a string of just "'
usdx_additional_songs_dirs = [p.strip().strip(""""'""") for p in _config.get("USDX", "additional_songs_dirs", fallback="").split("\n") if p.strip()]

if _usdx_avatars_dir_raw := _config.get("USDX", "avatars_dir", fallback=None):
    usdx_avatars_dir = Path(_usdx_avatars_dir_raw).expanduser()
else:
    usdx_avatars_dir = usdx_base_path / "avatars"

if _usdx_ultrastar_db_raw := _config.get("USDX", "ultrastar_db", fallback=None):
    usdx_ultrastar_db = Path(_usdx_ultrastar_db_raw).expanduser()
else:
    usdx_ultrastar_db = usdx_base_path / "Ultrastar.db"

usdb_user = _config.get("USDB", "username")
usdb_pass = _config.get("USDB", "password")
usdb_downloader_count = int(_config.get("USDB", "downloader_count", fallback=4))

setup_colors = _config.get("SETUP", "colors").split(",")

client_url = _config.get("SETUP", "client_url")

if os.environ.get("IS_WINDOWS_INSTALLATION") == "true":
    youtube_dl = os.path.join(SCRIPT_BASE_PATH, "executables", "yt-dlp.exe")
    ffmpeg = os.path.join(SCRIPT_BASE_PATH, "executables", "ffmpeg.exe")
else:
    youtube_dl = _config.get("OTHER", "youtube_dl")
    ffmpeg = _config.get("OTHER", "ffmpeg")


def save_usdb_credentials(username, password):
    _config['USDB'] = {'username': username, 'password': password}
    with open(file_name, 'w') as configfile:
        _config.write(configfile)
