import logging
from enum import Enum
from typing import Set, Dict
from fastapi import WebSocket

from song import Song

ws_connections: Set[WebSocket] = set()

current_download_queue: Dict[str, Dict[str, str]] = {}


class MessageType(str, Enum):
    download_queue = "download_queue"  # Datum


async def ws_broadcast(message_type: MessageType, message: dict):
    logging.info(f"Broadcasting {message_type.value} message: {message}")
    for connection in list(ws_connections):
        await connection.send_json({
            "message_type": message_type.value,
            "message": message
        })


async def broadcast_download_queued(usdb_id: str):
    """
    Broadcast that a download was queued

    :param usdb_id: The id of the queued song
    """

    current_download_queue[usdb_id] = {
        "state": "queued"
    }

    await ws_broadcast(MessageType.download_queue, {
        "in_queue": current_download_queue
    })


async def broadcast_download_started(usdb_id: str, title: str, artist: str):
    """
    Broadcast that a download was started

    :param usdb_id: The id of the queued song
    :param title: The title of the song
    :param artist: The artist of the song
    """

    current_download_queue[usdb_id] = {
        "state": "downloading",
        "title": title,
        "artist": artist
    }

    await ws_broadcast(MessageType.download_queue, {
        "in_queue": current_download_queue
    })


async def broadcast_download_complete(song: Song):
    """
    Broadcast that a download is done

    :param song: The song that is done
    """

    current_download_queue.pop(song.usdb_id, None)

    await ws_broadcast(MessageType.download_queue, {
        "in_queue": current_download_queue,
        "finished": song.to_json()
    })


async def broadcast_download_failed(usdb_id, error: str):
    """
    Broadcast that a download has failed

    :param usdb_id: The id of the queued song
    :param error: The error message
    """

    failed = current_download_queue.pop(usdb_id, None)
    failed.pop("state", None)
    failed["usdb_id"] = usdb_id
    failed["error"] = error

    await ws_broadcast(MessageType.download_queue, {
        "in_queue": current_download_queue,
        "failed": failed
    })
