from fastapi import APIRouter, HTTPException
from models import Person, Note, Task, CreatePerson
from typing import List
from bson import ObjectId
from database import get_persons_collection, get_notes_collection, get_tasks_collection

router = APIRouter()


@router.post("/persons/", response_model=Person)
async def create_person(person: CreatePerson):
    persons_collection = get_persons_collection()
    person_data = person.model_dump()
    person_data["_id"] = str(ObjectId())
    result = persons_collection.insert_one(person_data)
    created_person = persons_collection.find_one({"_id": result.inserted_id})

    if created_person:
        created_person["id"]  = str(created_person["_id"])
        return Person(**created_person)

    raise HTTPException(status_code=500, detail="Failed to create person")


@router.get("/persons/{person_id}", response_model=Person)
async def read_person(person_id: str):
    persons_collection = get_persons_collection()
    person = persons_collection.find_one({"_id": ObjectId(person_id)})

    if person:
        person["_id"] = str(person["_id"])
        return Person(**person)

    raise HTTPException(status_code=404, detail="Person not found")


@router.get("/persons/", response_model=List[Person])
async def read_persons():
    persons_collection = get_persons_collection()
    persons = list(persons_collection.find())

    for person in persons:
        person["id"] = str(person["_id"])

    return [Person(**person) for person in persons]


@router.post("/notes/", response_model=Note)
async def create_note(note: Note):
    notes_collection = get_notes_collection()
    note_data = note.model_dump()
    note_data["_id"] = str(ObjectId())
    result = notes_collection.insert_one(note_data)
    created_note = notes_collection.find_one({"_id": result.inserted_id})

    if created_note:
        created_note["_id"] = str(created_note["_id"])
        return Note(**created_note)

    raise HTTPException(status_code=500, detail="Failed to create note")


@router.post("/tasks/", response_model=Task)
async def create_task(task: Task):
    tasks_collection = get_tasks_collection()
    task_data = task.model_dump()
    task_data["_id"] = str(ObjectId())
    result = tasks_collection.insert_one(task_data)
    created_task = tasks_collection.find_one({"_id": result.inserted_id})

    if created_task:
        created_task["_id"] = str(created_task["_id"])
        return Task(**created_task)

    raise HTTPException(status_code=500, detail="Failed to create task")
