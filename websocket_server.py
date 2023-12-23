import asyncio
import json
import logging
import websockets

from song import Song


messages = []

class WebSocketServer:
    def __init__(self, download_queue: asyncio.Queue):
        self.download_queue = download_queue

        self.clients = set()

    async def register(self, websocket):
        self.clients.add(websocket)

    async def unregister(self, websocket):
        self.clients.remove(websocket)

    async def send_to_clients(self, message):
        logging.debug(f"Sending {message}")
        messages.append(message)
        if self.clients:
            websockets.broadcast(self.clients, json.dumps(message))

    async def handler(self, websocket, path):
        await self.register(websocket)
        try:
            async for message in websocket:
                print(f"Received message from client: {message}")
        except Exception as e:
            logging.error(f"Error on websocket: {e}")
        finally:
            await self.unregister(websocket)

    async def message_queue_consumer(self):
        while True:
            message = await self.message_queue.get()
            await self.send_to_clients(message)

    async def download_queue_consumer(self, i):
        # TODO: not actually threaded
        await self.send_to_clients({
            "msg": f"[Downloader {i}] Ready",
            "type": "log"
        })

        while True:
            id = await self.download_queue.get()

            await self.send_to_clients({
                "msg": f"[Downloader {i}] Starting download for {id}",
                "type": "log"
            })

            try:
                song = await Song.download(id)

                await self.send_to_clients({
                    "msg": f"[Downloader {i}] Successfully downloaded {song}",
                    "type": "log"
                })
            except Exception as e:
                logging.exception("Download failed")
                await self.send_to_clients({
                    "msg": f"[Downloader {i}] Download for {id} failed: {e}",
                    "type": "error"
                })
