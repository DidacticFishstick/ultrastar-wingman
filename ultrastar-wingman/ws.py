import logging
from enum import Enum
from typing import Set
from fastapi import WebSocket

ws_connections: Set[WebSocket] = set()


class WsMessageType(str, Enum):
    download_queued = "download_queued"  # Datum
    download_started = "download_started"  # Datum
    download_finished = "download_finished"  # Datum
    download_failed = "download_failed"  # Datum


async def broadcast(message_type: WsMessageType, message: dict):
    """
    Broadcast a message to all connected websockets

    :param message_type: The type of the message (used for the subscription)
    :param message: The message to broadcast
    """

    logging.info(f"Broadcasting ws {message_type.value} message: {message}")
    for connection in list(ws_connections):
        await connection.send_json({
            "message_type": message_type.value,
            "message": message
        })
