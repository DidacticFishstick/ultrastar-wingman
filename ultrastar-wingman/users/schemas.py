import uuid
import re
from typing import Optional
from typing import Any

from pydantic import GetCoreSchemaHandler, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema, PydanticCustomError
from pydantic_core.core_schema import CoreSchema
from fastapi_users import schemas


class UsernameStr:
    """
    Validate that the username contains only standard ASCII characters
    for basic usernames (letters, digits, underscores, and dashes).

    Usage:

    ```py
    from pydantic import BaseModel, Field

    class Model(BaseModel):
        username: UsernameStr

    print(Model(username='username_123'))
    #> username='username_123'
    ```
    """

    @classmethod
    def __get_pydantic_core_schema__(
            cls,
            _source: type[Any],
            _handler: GetCoreSchemaHandler,
    ) -> CoreSchema:
        return core_schema.no_info_after_validator_function(cls._validate, core_schema.str_schema())

    @classmethod
    def __get_pydantic_json_schema__(
            cls, core_schema: CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        field_schema = handler(core_schema)
        field_schema.update(type='string', format='ascii-username')
        return field_schema

    @classmethod
    def _validate(cls, __input_value: str) -> str:
        if not cls.has_valid_chars(__input_value):
            raise PydanticCustomError(
                'value_error',
                'value is not a valid username: {reason}',
                {'reason': 'Username must contain only letters, digits, underscores, or dashes'},
            )
        if len(__input_value) > 32:
            raise PydanticCustomError(
                'value_error',
                'value is not a valid username: {reason}',
                {'reason': 'Username must not exceed 32 characters'},
            )
        return __input_value

    @staticmethod
    def has_valid_chars(s: str) -> bool:
        return re.match(r'^[A-Za-z0-9_-]+$', s) is not None


class UserRead(schemas.BaseUser[uuid.UUID]):
    # Not using email as email but as username
    email: UsernameStr
    access_level: int


class UserCreate(schemas.BaseUserCreate):
    # Not using email as email but as username
    email: UsernameStr


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
    email: Optional[UsernameStr] = None
    access_level: Optional[int] = None
