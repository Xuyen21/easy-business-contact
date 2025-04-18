from dotenv import dotenv_values
from pymongo import MongoClient

# these following 3 variables can be stored in .env file
config = dotenv_values(".env")
mongo_user = config.get("mongodb_user")
mongo_password = config.get("mongodb_password")
uri = f"mongodb://{mongo_user}:{mongo_password}@localhost:27017/"

client = MongoClient(uri)
db = client["contacts"]


def get_persons_collection():
    return db["persons"]


def get_notes_collection():
    return db["notes"]


def get_tasks_collection():
    return db["tasks"]
