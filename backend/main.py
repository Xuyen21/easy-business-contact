from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.note_router import note_router
from backend.routers.person_router import person_router
from backend.routers.task_router import task_router

app = FastAPI()

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
