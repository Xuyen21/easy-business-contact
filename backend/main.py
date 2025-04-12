from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from contextlib import asynccontextmanager
from routes import router
from fastapi.middleware.cors import CORSMiddleware
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
app.include_router(router)
