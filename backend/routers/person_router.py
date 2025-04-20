import logging
from typing import List, Any, Dict

from fastapi import APIRouter, HTTPException

from . import service_call_handler
from ..persistence.database import get_persons_collection
from ..persistence.models import Person, CreatePerson
from ..service.person_service import PersonService, get_person_service

LOG = logging.getLogger(__name__)


class PersonRouter:
    def __init__(self, service: PersonService):
        self.router = APIRouter()
        self.person_service = service

        # Define routes
        self.router.post("/persons/", response_model=Person, tags=["persons"], summary="Creates a new person.")(self.create_person)
        self.router.get("/persons/{person_id}", response_model=Person, tags=["persons"], summary="Retrieves a specific person by their ID.")(self.read_person)
        self.router.get("/persons/", response_model=List[Person], tags=["persons"], summary="Retrieves a list of all persons.")(self.read_persons)
        self.router.patch("/persons/{person_id}", response_model=Person, tags=["persons"], summary="Updates partly an existing person's information like name, email and more.")(self.update_person)
        self.router.delete("/persons/{person_id}", status_code=204, tags=["persons"], summary="Deletes a specific person by their ID.")(self.delete_person)

    async def create_person(self, person: CreatePerson):
        return await service_call_handler(
            lambda: self.person_service.create(person),
        )

    async def read_person(self, person_id: str):
        found_person = await self.person_service.read(person_id)
        if not found_person:
            raise HTTPException(status_code=404, detail="Person not found")
        return found_person

    async def read_persons(self, person_search: str = None):
        return await self.person_service.read_all(person_search)

    async def update_person(self, person_id: str, person_update: Dict[str, Any]):
        return await service_call_handler(
            lambda: self.person_service.update(person_id, person_update))

    async def delete_person(self, person_id: str):
        LOG.debug(f"Attempting to delete person with ID: {person_id}")
        persons_collection = get_persons_collection()
        result = persons_collection.delete_one({"_id": person_id})  # add type hint

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Person not found")
        return {"message": "deleted", "id": person_id}


# resolve dependencies and configure router
person_service = get_person_service()
person_router = PersonRouter(person_service)
