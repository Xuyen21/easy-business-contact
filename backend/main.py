from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.note_router import note_router
from backend.routers.person_router import person_router
from backend.routers.task_router import task_router

tags_metadata = [
    {
        "name": "persons",
        "description": "Operations with persons. Each person is a business contact the user wants to stay in touch.",
    },
    {
        "name": "notes",
        "description": "Operations with notes. User can add notes to each person, e.g., summary of the last meeting.",
    },
    {
        "name": "tasks",
        "description": "Operations with tasks. User can add tasks to schedule an activity for a business contact.",
    },
]
app = FastAPI(
    title="Easy Business Contact API",
    description="API that provides a simple way to keep your business contacts under control.",
    contact={
        "name": "Xuyen Furmanczuk",
        "email": "ntxyuen998@gmail.com"
    },
    license_info={
        "name": "MIT License",
        "url": "https://mit-license.org/"
    },
    openapi_tags=tags_metadata,
)

# allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # ✅ React dev server
        "http://127.0.0.1:5173",
        # ✅ allow both localhost and 127.0.0.1 just in case
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(person_router.router)
app.include_router(note_router.router)
app.include_router(task_router.router)
