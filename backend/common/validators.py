from typing import Optional, Any, Mapping

from pydantic import HttpUrl

from backend.common.exeptions import InvalidDataException, NotFoundException
from backend.persistence.database import get_persons_collection


def validate_url(url: str, required: bool) -> Optional[HttpUrl]:
    if url is None:
        if required:
            raise ValueError("URL is required")
        return None
    if not url or not url.strip():
        return None
    return HttpUrl(url)


def validate_entity_attributes(person_data: Mapping[str, Any], update_attributes: set, entity_name: str):
    for key in update_attributes:
        if key not in person_data:
            raise InvalidDataException(f'{key} is not valid property of {entity_name}')


def validate_person_id(key):
    persons_collection = get_persons_collection()
    found_person = persons_collection.find_one({"_id": key})
    if not found_person:
        raise NotFoundException(f"Person with id {key} not found")
