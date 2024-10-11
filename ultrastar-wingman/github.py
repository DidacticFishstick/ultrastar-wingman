import logging

import httpx
from typing import Optional
from dataclasses import dataclass


@dataclass
class ReleaseInfo:
    new_version: str
    download_url: Optional[str]


def check_new_release(repo: str, current_version: Optional[str] = None, asset_name: Optional[str] = None) -> Optional[ReleaseInfo]:
    """
    Checks if a new release is available for the given GitHub repository and optionally returns the download URL of a specified asset.

    :param repo: GitHub repository in the form 'owner/repo'
    :param current_version: Current known version (e.g., 'v1.0.0')
    :param asset_name: Optional name of the asset to retrieve the download URL
    :return: ReleaseInfo dataclass with 'new_version' and 'download_url' if applicable, otherwise None
    """
    url = f"https://api.github.com/repos/{repo}/releases/latest"

    try:
        response = httpx.get(url)
        response.raise_for_status()
        latest_release = response.json()
        latest_version = latest_release['tag_name']

        # Check if there is a new version
        if current_version and current_version == latest_version:
            return None

        # Find the asset if asset_name is provided
        download_url = None
        if asset_name and 'assets' in latest_release:
            for asset in latest_release['assets']:
                if asset['name'] == asset_name:
                    download_url = asset['browser_download_url']
                    break

        return ReleaseInfo(new_version=latest_version, download_url=download_url)

    except httpx.HTTPStatusError as e:
        logging.error(f"Error fetching newest release version for {url}: {e}")
        return None

# TODO: use this to automatically download new version of yt-dlp
