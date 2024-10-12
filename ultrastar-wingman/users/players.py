import logging
import os
import re
import uuid
from typing import Dict, Optional, List, Tuple

from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select, update

from .db import User as UserModel, async_session_maker
from .users import User
from .permissions import AccessLevel

possible_photo_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'heic']


def find_photo_file(directory, filename):
    for ext in possible_photo_extensions:
        full_path = os.path.join(directory, filename + "." + ext)
        if os.path.isfile(full_path):
            return full_path
    return None


class Player:
    _registered: Dict[str, 'Player'] = {}
    _unregistered: Dict[str, 'Player'] = {}

    @classmethod
    def from_user(cls, user):
        if str(user.id) not in cls._registered:
            cls._registered[str(user.id)] = Player(name=user.email, user=user)
        return cls._registered[str(user.id)]

    @classmethod
    async def new_temporary(cls, name: str) -> 'Player':
        """
        Creates a new temporary player

        :param name: The name for the player
        :return: The new user
        :raises: ValueError if name is already taken
        """

        logging.info(f"Creating new temporary player '{name}'")

        if re.match(r'^[A-Za-z0-9_ -]+$', name) is None:
            raise ValueError(f'Username must contain only letters, digits, underscores, or dashes')

        if name in list(user.name for user in cls._registered.values()):
            raise ValueError(f'Registered player with name {name} already exists')

        if name in list(user.name for user in cls._unregistered.values()):
            raise ValueError(f'Player with name {name} already exists')

        async with async_session_maker() as session:
            async with session.begin():
                result = await session.execute(select(UserModel).where(UserModel.email == name))
                users = result.scalars().all()
                if len(users) > 0:
                    raise ValueError(f'Player with name {name} already exists')

        player = Player(name=name)

        cls._unregistered[player.id] = player

        return player

    @classmethod
    def delete_temporary(cls, id: str) -> Optional['Player']:
        """
        Removes a temporary player
        Does nothing if the player does not exist

        :param id: The id of the player
        :return: The user if it existed
        """

        logging.info(f"Removing temporary player '{id}'")

        return cls._unregistered.pop(id)

    @classmethod
    async def all_registered_players(cls) -> List['Player']:
        """
        Gets all registered players from the db.
        For every unregistered player that has a registered player with the name,
        the unregistered player will be removed and a registered player will be added.

        :return: Two lists of registered players
        """

        # TODO: get last active time
        async with async_session_maker() as session:
            async with session.begin():
                result = await session.execute(select(UserModel))
                users = result.scalars().all()

        for user in users:
            player = None
            for player in cls._unregistered.values():
                if user.email == player.name:
                    cls._unregistered.pop(player.id)
                    player.set_user(user)
                    cls._registered[str(user.id)] = player
            if player is None:
                cls.from_user(user)

        return list(cls._registered.values())

    @classmethod
    async def all_players(cls) -> Tuple[List['Player'], List['Player']]:
        """
        Gets all registered players from the db.
        For every unregistered player that has a registered player with the name,
        the unregistered player will be removed and a registered player will be added.

        :return: Two lists of registered players and unregistered players
        """

        return await cls.all_registered_players(), list(cls._unregistered.values())

    @classmethod
    async def get_by_id(cls, id: str) -> Optional['Player']:
        """
        Returns the registered player with the given id, None otherwise

        :param id: The id
        :return: The player or None
        """

        if not id:
            return None

        player = cls._registered.get(id) or cls._unregistered.get(id)

        if player is None:
            async with async_session_maker() as session:
                async with session.begin():
                    try:
                        result = await session.execute(select(UserModel).where(UserModel.id == id))
                        users = result.scalars().all()

                        if users:
                            player = cls.from_user(users[0])
                    except Exception as e:
                        logging.exception("Failed to look up user by id")

        return player

    def __init__(self, name: str, user: Optional[User] = None):
        """
        Create a new player with an optional registered user

        :param name: The name for the user
        :param user: Optional user object
        """

        self._name = name
        self._user = user
        if self._user is None:
            self._id = str(uuid.uuid4())
        else:
            self._id = str(self.user.id)

    def __str__(self) -> str:
        return self._name

    def __repr__(self) -> str:
        return f"[{'unregistered' if self._user is None else 'registered'} Player '{self._name}']"

    @property
    def name(self) -> str:
        return self._name

    @property
    def id(self) -> Optional[str]:
        return self._id

    @property
    def user(self) -> Optional[User]:
        return self._user

    def set_user(self, user: User):
        """
        Sets the user if it just registered

        :param user: The user
        """

        self._user = user
        self._id = str(user.id)

    def to_json(self) -> Dict[str, str]:
        data = {
            "name": self._name,
            "id": self._id
        }

        if self.user is not None:
            data["access_level"] = self.user.access_level

        return data

    def get_avatar_file_response(self, avatars_dir) -> FileResponse:
        """
        Returns the avatar of the user as a file response

        :return: A file response
        :raises HTTPException if the user has no avatar
        """

        avatar_file = find_photo_file(avatars_dir, self.id)

        if avatar_file is not None:
            return FileResponse(avatar_file)
        else:
            raise HTTPException(status_code=404, detail="Player has no avatar")

    async def set_avatar(self, avatars_dir, file):
        file_extension = file.filename.rsplit(".")[-1].lower()
        if file_extension not in possible_photo_extensions:
            raise HTTPException(status_code=400, detail=f"File must be one of {', '.join(possible_photo_extensions)}")

        avatar_file = find_photo_file(avatars_dir, self.id)

        if avatar_file:
            os.remove(avatar_file)

        path = os.path.join(avatars_dir, f"{self.id}.{file_extension}")
        logging.info(f"Saving player avatar to {avatar_file}")

        with open(path, "wb") as buffer:
            buffer.write(await file.read())

    async def set_access_level(self, access_level: int):
        """
        Sets the access level for this player in the db

        :param access_level: The new access level
        :raises: ValueError if the player is not registered / has no user
        """

        if self._user is None:
            raise ValueError("User is not registered and has no access level")

        self._user.access_level = access_level

        async with async_session_maker() as session:
            async with session.begin():
                try:
                    await session.execute(
                        update(UserModel)
                        .where(UserModel.id == self.id)
                        .values(access_level=access_level)
                        .values(is_superuser=(access_level == AccessLevel.admin))
                    )
                except:
                    logging.exception(f"Failed to set access level for {self}")
