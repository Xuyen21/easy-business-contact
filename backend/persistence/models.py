from datetime import datetime, timezone
from typing import List, Optional

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    HttpUrl,
    field_serializer,
    field_validator,
)

from backend.common.validators import validate_url


class CreateNote(BaseModel):
    person_id: str
    content: str


class Note(CreateNote):
    id: str
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CreateTask(BaseModel):
    person_id: str
    description: str
    due_date: Optional[datetime] = None


class Task(CreateTask):
    id: str
    creation_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CreatePerson(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    date_of_birth: Optional[datetime] = None
    linkedin: Optional[HttpUrl] = None
    role: Optional[str] = None
    company: Optional[str] = None
    image_url: Optional[HttpUrl] = None
    image_blob: Optional[str] = None

    @field_validator("image_url", "linkedin", mode="before")
    @classmethod
    def urls(cls, value: str) -> HttpUrl:
        return validate_url(value, False)

    @field_serializer("image_url", "linkedin")
    def url2str(self, val) -> str:
        if isinstance(val, HttpUrl):
            return str(val)
        return val


class Person(CreatePerson):
    id: str
