import argparse
import asyncio
import json
import logging
import os.path
import subprocess
import threading
from getpass import getpass

import requests
import websockets
from flask import render_template, Flask, request, Response, send_file

import config
import usdb
import usdx
from song import Song
from websocket_server import WebSocketServer, messages

app = Flask(__name__)
usdx_process = None
download_queue = asyncio.Queue()
event_loop = asyncio.get_event_loop()
php_session_id = None


def restart_usdx():
    global usdx_process
    if usdx_process is not None:
        logging.info("Stopping USDX")
        # os.kill(usdx_process.pid, signal.CTRL_C_EVENT)
        subprocess.call(['taskkill', '/F', '/T', '/PID', str(usdx_process.pid)])
        # usdx_process.terminate()
    logging.info("Starting USDX")
    usdx_process = subprocess.Popen(config.usdx_path, shell=True)


@app.route('/')
def index():
    return render_template('index.html', messages=messages)


@app.route('/songs')
def songs():
    return render_template('songs.html', songs=Song.song_list(), messages=messages)


@app.route('/song/<song_id>/cover', methods=['GET'])
def cover(song_id):
    song = Song.get_song_by_id(song_id)

    if song.cover_path:
        return send_file(song.cover_path, mimetype=f'image/{song.cover_path.rsplit(".", 1)[-1].lower()}')
    else:
        # TODO: default cover
        return "", 404


@app.route('/avatars/<avatar>', methods=['GET'])
def avatar(avatar):
    try:
        return send_file(os.path.join("avatars", f"cat_{avatar}"), mimetype=f'image/jpg')
    except FileNotFoundError:
        return send_file(os.path.join("avatars", "cat_rainbow.jpg"), mimetype=f'image/jpg')


@app.route('/download')
def download():
    if request.args.get("view", "list") == "usdb":
        return render_template('download.html', messages=messages)
    else:
        return render_template('download_list.html', messages=messages)


@app.route('/scores')
def scores():
    return render_template('scores.html', messages=messages)


@app.route('/players')
def players():
    return render_template('players.html', messages=messages, colors=config.setup_colors)


@app.route('/api/restart', methods=['POST'])
def api_restart():
    restart_usdx()
    return {"success": True}, 200


@app.route('/api/usdb_ids', methods=['GET'])
def api_ausdb_ids():
    return list(Song.usdb_ids), 200


@app.route('/api/download', methods=['POST'])
def api_download_post():
    id = request.json.get('id', '')
    if not id:
        return {"success": False, "error": "missing id"}, 400
    id = int(id)

    asyncio.run_coroutine_threadsafe(download_queue.put(id), event_loop)

    return {"success": True}, 200


@app.route('/usdb/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE'])
@app.route('/usdb/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(path):
    # TODO: data does not work correctly
    res = usdb.session.request(
        method=request.method,
        url=request.url.replace(f"{request.host_url}usdb/", "https://usdb.animux.de/"),
        data=request.get_data(),
    )

    return res.content, res.status_code

    # headers = {k: v for k, v in request.headers if k.lower() != 'host'}
    #
    # # let everybody use the same php session key
    # global php_session_id
    # if php_session_id is None:
    #     php_session_id = headers.get("Cookie")
    #     Song.php_session_id = php_session_id
    #
    # if php_session_id is not None:
    #     headers["Cookie"] = php_session_id
    #
    # res = requests.request(
    #     method=request.method,
    #     url=request.url.replace(f"{request.host_url}usdb/", "https://usdb.animux.de/"),
    #     headers=headers,
    #     data=request.get_data(),
    #     cookies=request.cookies,
    #     allow_redirects=False,
    # )
    #
    # excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    # headers = [
    #     (k, v) for k, v in res.raw.headers.items()
    #     if k.lower() not in excluded_headers
    # ]
    #
    # response = Response(res.content, res.status_code, headers)
    # return response


@app.route('/api/usdb/get_songs', methods=['GET'])
def get_songs_route():
    args: dict = request.args.to_dict()
    for key in ["golden", "songcheck"]:
        if key in args:
            args[key] = args[key] == "true"

    songs = usdb.get_songs(**args)

    for song in songs["songs"]:
        song["downloaded"] = song["id"] in Song.usdb_ids

    return songs


@app.route('/api/players', methods=['GET', 'POST'])
def names():
    if request.method == 'POST':
        name = request.form['name']
        logging.info(f"Adding player '{name}'")
        with open(config.players_file, 'a') as file:
            file.write(name + '\n')
        return {"success": True}
    else:
        try:
            with open(config.players_file, 'r') as file:
                names = file.read().splitlines()
            return sorted(set(names))
        except FileNotFoundError:
            return []


@app.route('/api/players/delete', methods=['POST'])
def delete_name():
    name_to_delete = request.form['name']
    logging.info(f"Deleting player '{name_to_delete}'")
    with open(config.players_file, 'r') as file:
        names = file.read().splitlines()
    with open(config.players_file, 'w') as file:
        for name in names:
            if name != name_to_delete:
                file.write(name + '\n')
    return {"success": True}

@app.route('/api/players/submit', methods=['POST'])
def submit_names():
    usdx.enter_names(json.loads(request.form['names']))
    return {"success": True}


def main():
    usdb.login(config.usdb_user, config.usdb_pass)

    # TODO: get the colors from config
    usdx.change_config(config.setup_colors)
    restart_usdx()

    threading.Thread(target=app.run, kwargs={"host": "0.0.0.0", "port": 5000}).start()

    Song.load_songs()
    server = WebSocketServer(download_queue)

    start_server = websockets.serve(server.handler, "0.0.0.0", 5678)

    asyncio.get_event_loop().run_until_complete(start_server)

    for i in range(8):
        asyncio.get_event_loop().create_task(server.download_queue_consumer(i))

    asyncio.get_event_loop().run_forever()


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] %(levelname)-8s %(name)-12s %(message)s',
    )

    main()
