import asyncio
import getpass
import logging
import httpx
from typing import Optional
from enum import Enum
from bs4 import BeautifulSoup
from fastapi import HTTPException

import config
import ws
from song import Song

session = httpx.AsyncClient()


async def login_request(username, password) -> bool:
    """
    Performs the login to usdb.animux.de

    :param username: The username to use
    :param password: The password to use
    :return: True if the login was successful
    """

    payload = {
        'user': username,
        'pass': password,
        'login': 'Login'
    }

    await session.post('https://usdb.animux.de/?link=home', data=payload)

    response = await session.get("https://usdb.animux.de/?link=browse")

    if "You are not logged in" in response.text:
        return False
    else:
        return True


async def login():
    username = config.usdb_user
    password = config.usdb_pass
    if username == "<username>" or password == "<password>":
        username = None
        password = None

    while True:
        if username is None or password is None:
            print(f"To download songs, you need an account on https://usdb.animux.de. Create an account and enter the credentials below. You can always change these settings in the config file '{config.file_name}'.")
            new_username = input("Username: ")
            new_password = getpass.getpass("Password: ")

            # Windows doing windows things...
            while new_password == "\x16":
                print("The windows cmd does not allow pasting into password fields using ctrl+V. Why would anyone need that?")
                print("Instead you can right click in the terminal to paste your password")
                new_password = getpass.getpass("Password: ")

            if new_username != username or new_password != password:
                config.save_usdb_credentials(new_username, new_password)
                username, password = new_username, new_password

        if await login_request(username, password):
            print(f"Login as {username} on https://usdb.animux.de successful")
            break
        else:
            print("Invalid credentials. Please try again.")
            username = None
            password = None


class OrderEnum(str, Enum):
    id = "id"  # Datum
    artist = "artist"  # Interpret
    title = "title"  # Titel
    edition = "edition"  # Edition
    rating = "rating"  # Bewertung
    language = "language"  # Sprache
    views = "views"  # Aufrufe
    golden = "golden"  # Goldene Noten


class UdEnum(str, Enum):
    asc = "asc"  # ascending
    desc = "desc"  # descending


async def get_songs(artist: Optional[str] = None, title: Optional[str] = None, edition: Optional[str] = None, language: Optional[str] = None, genre: Optional[str] = None, order: OrderEnum = OrderEnum.rating, ud: UdEnum = UdEnum.desc, golden: bool = False, songcheck: bool = False, limit: int = 30, page: int = 1):
    """
    Returns a list of all songs that match the search criteria

    :param artist: Optional artist
    :param title: Optional title
    :param edition: Optional edition
    :param language: Optional language
    :param genre: Optional genre
    :param order: The order of the result
        id: Datum
        artist: Interpret
        title: Titel
        edition: Edition
        rating: Bewertung
        language: Sprache
        views: Aufrufe
        golden: Goldene Noten
    :param ud: Ascending or descending
        asc: ascending
        desc: descending
    :param golden: Only songs with golden notes
    :param songcheck: only songs with songcheck
    :param limit: How many songs to fetch
    :param page: The page for paging (starting at 1)
    :return: A list of songs
    """

    payload = {
        "interpret": artist or "",
        "title": title or "",
        "edition": edition or "",
        "language": language or "",
        "genre": genre or "",
        "order": order.value,
        "ud": ud.value,
        "limit": str(limit),
        "start": str((int(page) - 1) * int(limit))
    }
    if golden:
        payload["golden"] = "1"
    if songcheck:
        payload["songcheck"] = "1"

    response = await session.post("https://usdb.animux.de/?link=list", data=payload)

    if "You are not logged in." in response.text:
        logging.error("No longer logged in to usdb.animux.de")
        raise HTTPException(status_code=403, detail="Not logged in to usdb.animux.de")

    # Parse the HTML content
    soup = BeautifulSoup(response.text, "html.parser")

    result = {
        "paging": {
            "current": int(page),
            "pages": int(page)
        }
    }
    # get the actual last page
    for current in soup.select('a:has(> b > u) ~ a:nth-last-of-type(1)'):
        result["paging"]["pages"] = int(current.get_text()[1:-1])

    # TODO: get total number of songs
    # TODO: 403 if not logged into USDB

    # Extract table rows
    rows = soup.select('.row1 table tr:not(.list_head)')

    # Create a list to hold dictionaries (each dictionary represents a row in the table)
    data = []

    # Iterate over each row, starting from the second one (because the first row contains headers)
    for row in rows:
        # Extract table data (td) from each row
        tds = row.select("td")

        # Extracting relevant information from each td and adding to a dictionary
        row_data = {
            "id": tds[0].get_attribute_list("onclick")[0].split("(")[-1].rstrip(")"),
            "artist": tds[0].get_text(strip=True),
            "title": tds[1].get_text(strip=True),
            "genre": tds[1].get_text(strip=True),
            "year": tds[1].get_text(strip=True),
            "edition": tds[4].get_text(strip=True),
            "golden": tds[5].get_text(strip=True) == "Ja",
            "language": tds[6].get_text(strip=True),
            "creator": tds[6].get_text(strip=True),
            "rating": len(tds[8].select("img[src='images/star.png']")) + 0.5 * len(tds[5].select("img[src='images/half_star.png']")),
            "views": int(tds[9].get_text(strip=True))
        }

        # Add the dictionary to the list
        data.append(row_data)

    # Output the extracted data
    logging.info(f"Fetched {len(data)} Songs from USDB")

    result["songs"] = data

    return result


async def download_queue_consumer(queue: asyncio.Queue):
    """
    A consumer that downloads songs from the queue

    :param queue: The queue to download songs from
    """

    logging.info("Starting download queue consumer")

    while True:
        usdb_id = await queue.get()

        try:
            song = await Song.download(usdb_id)
        except Exception as e:
            logging.exception(f"Failed to download song {usdb_id}")
            await ws.broadcast_download_failed(usdb_id, str(e))
        else:
            await ws.broadcast_download_complete(song)

        queue.task_done()
