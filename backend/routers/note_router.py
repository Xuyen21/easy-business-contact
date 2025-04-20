import logging
from typing import List, Any, Dict

from fastapi import APIRouter, HTTPException

from . import service_call_handler
from ..persistence.models import Note, CreateNote
from ..service.note_service import get_note_service, NoteService

LOG = logging.getLogger(__name__)


class NoteRouter:
    def __init__(self, service: NoteService):
        self.router = APIRouter()
        self.note_service = service
        # Define all crud routes
        self.router.post("/notes/", response_model=Note, tags=["notes"], summary="Creates a new note for a specific person.")(self.create_note)
        self.router.get("/notes/detail/{note_id}", response_model=Note, tags=["notes"], summary="Retrieves a specific note by its ID.")(self.read_note)
        self.router.get("/notes/{person_id}", response_model=List[Note], tags=["notes"], summary="Retrieves all notes associated with a specific person ID.")(self.read_notes)
        self.router.patch("/notes/{note_id}", response_model=Note, tags=["notes"], summary="Updates an existing note.")(self.update_note)
        self.router.delete("/notes/{note_id}", status_code=204, tags=["notes"], summary="Deletes a specific note by its ID.")(self.delete_note)

    async def create_note(self, note: CreateNote):
        return await service_call_handler(
            lambda: self.note_service.create(note))

    async def read_note(self, note_id: str):
        found_note = await self.note_service.read(note_id)
        if not found_note:
            raise HTTPException(status_code=404, detail="Note not found")
        return found_note

    async def read_notes(self, person_id: str):
        return await self.note_service.read_all(person_id)

    async def update_note(self, note_id: str, note_update: Dict[str, Any]):
        return await service_call_handler(
            lambda: self.note_service.update(note_id, note_update))

    async def delete_note(self, note_id: str):
        return await self.note_service.delete(note_id)


# resolve dependencies and configure router
note_service = get_note_service()
note_router = NoteRouter(note_service)
