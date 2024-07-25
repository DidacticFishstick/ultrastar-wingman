import uuid
from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    # Not using email as email but as username
    email: str
    access_level: int


class UserCreate(schemas.BaseUserCreate):
    # Not using email as email but as username
    email: str


class UserUpdate(schemas.BaseUserUpdate):
    def create_update_dict(self):
        """
        Overloading super to also exclude email and access_level
        """

        print("I WAS CALLED")

        return schemas.model_dump(
            self,
            exclude_unset=True,
            exclude={
                "id",
                "email",
                "is_superuser",
                "is_active",
                "is_verified",
                "oauth_accounts",
                "access_level"
            },
        )

    # Not using email as email but as username
    email: Optional[str] = None
    access_level: Optional[int] = None
