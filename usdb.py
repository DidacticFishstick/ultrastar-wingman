import logging
import sys
from typing import Optional

import requests
from bs4 import BeautifulSoup

session = requests.Session()


def login(username, password) -> bool:
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

    session.post('https://usdb.animux.de/?link=home', data=payload)

    if "You are not logged in" in session.get("https://usdb.animux.de/?link=browse").text:
        return False
    else:
        return True


def get_songs(artist: Optional[str] = None, title: Optional[str] = None, edition: Optional[str] = None, language: Optional[str] = None, genre: Optional[str] = None, order: str = "rating", ud: str = "desc", golden: bool = False, songcheck: bool = False, limit: int = 30, page: int = 1):
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
        "order": order,
        "ud": ud,
        "limit": str(limit),
        "start": str((int(page) - 1) * int(limit))
    }
    if golden:
        payload["golden"] = "1"
    if songcheck:
        payload["songcheck"] = "1"

    response = session.post('https://usdb.animux.de/?link=list', data=payload)

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
            "id": int(tds[0].get_attribute_list("onclick")[0].split("(")[-1].rstrip(")")),
            "artist": tds[0].get_text(strip=True),
            "title": tds[1].get_text(strip=True),
            "edition": tds[2].get_text(strip=True),
            "golden": tds[3].get_text(strip=True) == "Ja",
            "language": tds[4].get_text(strip=True),
            "rating": len(tds[5].select("img[src='images/star.png']")) + 0.5 * len(tds[5].select("img[src='images/half_star.png']")),
            "views": int(tds[6].get_text(strip=True))
        }

        # Add the dictionary to the list
        data.append(row_data)

    # Output the extracted data
    logging.info(f"Fetched {len(data)} Songs from USDB")

    result["songs"] = data

    return result
