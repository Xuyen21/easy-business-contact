from . import update_entity, create_entity
from ..common.exeptions import NotFoundException
from ..persistence.database import get_notes_collection
from ..persistence.models import Note


class NoteService:
    def __init__(self):
        self.notes_collection = get_notes_collection()

    async def create(self, note):
        return await create_entity(self.notes_collection, note, Note)

    async def read(self, note_id):
        note = self.notes_collection.find_one({"_id": note_id})
        if note:
            note["id"] = str(note["_id"])
            return Note(**note)
        return None

    async def read_all(self, person_id: str):
        notes = list(self.notes_collection.find({"person_id": person_id}))
        for note in notes:
            note["id"] = str(note["_id"])
        return [Note(**note) for note in notes]

    async def update(self, note_id, note_update):
        return await update_entity(self.notes_collection, note_id, note_update, Note)

    async def delete(self, note_id):
        result = self.notes_collection.delete_one({"_id": note_id})
        if result.deleted_count == 0:
            raise NotFoundException("Note not found")
        return {"message": "deleted", "id": note_id}


def get_note_service():
    return NoteService()
