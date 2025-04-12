from datetime import datetime, timezone
from typing import List, Optional

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    HttpUrl,
    field_serializer,
    field_validator,
    validator,
)
from validators import validate_url


class Note(BaseModel):
    id: str
    person_id: str
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    content: str


class Task(BaseModel):
    id: str
    person_id: str
    creation_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    description: str
    due_date: Optional[datetime] = None


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
    notes: List[str] = []
    tasks: List[str] = []
