import logging
from enum import Enum
from typing import Optional, List

from fastapi import status, Depends, HTTPException

from .db import User
from .users import current_optional_user


class AccessLevel(int, Enum):
    unregistered = -1
    registered = 0
    trusted = 10
    manager = 20
    admin = 30


class Permission:
    permissions = {}

    def __init__(self, permission_id: str, title: str, description: str, default_min_access_level: AccessLevel):
        """
        Creates a new permission

        :param permission_id: An identifier for the permission (e.g. 'control.play', 'control.stop')
        :param title: A title for this permission
        :param description: A description for the permission
        :param default_min_access_level: The default minimum access level the user has to have (-1 for unregistered)
        """

        # TODO: get current settings

        self.permission_id = permission_id
        self.title = title
        self.description = description
        self.default_min_access_level = default_min_access_level

        self.permissions[self.permission_id] = self

    def __str__(self) -> str:
        return f'{self.permission_id}'

    def __repr__(self) -> str:
        return str(self)

    def check(self, user: Optional[User]):
        """
        Checks if the user has an access level high enough for this permission

        :param user: The user
        :raises: HTTPException if the permission is not given
        """

        if (user is None and self.default_min_access_level > -1) or (user is not None and user.access_level < self.default_min_access_level):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Missing Permission '{self.permission_id}' (requires access level '{self.default_min_access_level.name}')")


def check(user: User, *permissions: Permission):
    """
    Checks if the user has an access level high enough for all given permissions

    :param user: The user
    :param permissions: A list of permissions
    :raises: HTTPException if any permission is not given
    """

    for permission in permissions:
        permission.check(user)


def user_permissions(*permissions: Permission):
    """
    Returns a dependency that checks if the current user has all given permissions

    :param permissions: A list of required permissions
    :return: The dependency that checks if the current user has all given permissions
    """

    def custom_dependency(current_user: User = Depends(current_optional_user)):
        check(current_user, *permissions)
        return current_user

    return custom_dependency


# Defining all permission

songs_browse = Permission(
    "songs.browse",
    "Browse Songs",
    "Allows the user to browse all downloaded songs",
    AccessLevel.unregistered
)

songs_play = Permission(
    "songs.play",
    "Start Songs",
    "Allows the user to start a song",
    AccessLevel.trusted
)

songs_stop = Permission(
    "songs.stop",
    "Stop Song",
    "Allows the user to stop a song by exiting Ultrastar Deluxe",
    AccessLevel.trusted
)

wishlist_edit = Permission(
    "wishlist.add",
    "Edit Wishlist",
    "Allows the user to add songs to the wishlist and remove them",
    AccessLevel.unregistered
)

wishlist_view = Permission(
    "wishlist.view",
    "View Wishlist",
    "Allows the user to view the current wishlist",
    AccessLevel.unregistered
)

usdb_browse = Permission(
    "usdb.browse",
    "Browse usdb.animux.de",
    "Allows the user to browse usdb.animux.de",
    AccessLevel.unregistered
)

usdb_browse_proxy = Permission(
    "usdb.browse_proxy",
    "Browse usdb.animux.de Directly",
    "Allows the user to browse the default usdb.animux.de site (the user will have access to the configured USDB account!)",
    AccessLevel.manager
)

usdb_download = Permission(
    "usdb.download",
    "Download Songs from usdb.animux.de",
    "Allows the user to browse usdb.animux.de",
    AccessLevel.trusted
)

players_view = Permission(
    "players.view",
    "View Players",
    "Allows the user to view all current players",
    AccessLevel.unregistered
)

players_add = Permission(
    "players.add",
    "Add Player",
    "Allows the user to add a new temporary player",
    AccessLevel.unregistered
)

players_remove = Permission(
    "players.remove",
    "Remove Player",
    "Allows the user to remove a temporary player",
    AccessLevel.unregistered
)

scores_view_current = Permission(
    "scores.current",
    "Current Session Scores",
    "Allows the user to see the scores for the current session",
    AccessLevel.unregistered
)

scores_view_all = Permission(
    "scores.all",
    "All Scores",
    "Allows the user to see scores from previous sessions",
    AccessLevel.trusted
)

settings_view = Permission(
    "settings.all",
    "View Settings",
    "Allows the user to see these settings",
    AccessLevel.manager
)

settings_edit = Permission(
    "settings.all",
    "Edit Settings",
    "Allows the user to edit these settings and user permissions",
    AccessLevel.admin
)