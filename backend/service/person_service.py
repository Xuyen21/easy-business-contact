from re import search

from . import update_entity, create_entity_from_data
from ..common.resize_image import resize_image_blob
from ..persistence.database import get_persons_collection
from ..persistence.models import Person


class PersonService:
    def __init__(self):
        self.persons_collection = get_persons_collection()

    async def create(self, person):
        person_data = person.model_dump()
        person_data["resize_img"] = resize_image_blob(person_data["image_blob"])
        return await create_entity_from_data(Person, self.persons_collection, person_data)

    async def read(self, person_id: str = None):
        person = self.persons_collection.find_one({"_id": person_id})
        if person:
            process_person(person)
            return Person(**person)
        return None

    async def read_all(self, person_search: str = None):
        search_filter = {}
        if person_search:
            search_filter["$or"] = [
                {"first_name": {"$regex": person_search, "$options": "i"}},
                {"last_name": {"$regex": person_search, "$options": "i"}},
                {"email": {"$regex": person_search, "$options": "i"}},
            ]
        persons = list(self.persons_collection.find(search_filter))
        for person in persons:
            process_person(person)
        return [Person(**person) for person in persons]

    async def update(self, person_id, person_update: dict):
        return await update_entity(self.persons_collection, person_id, person_update, Person)


def process_person(person):
    person["id"] = str(person["_id"])
    if "resize_img" in person:
        person["image_blob"] = person["resize_img"]
        del person["resize_img"]


def get_person_service():
    return PersonService()
