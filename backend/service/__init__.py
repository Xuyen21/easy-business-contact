# Service and business logic to interact between APIs and persistence
from typing import Mapping, Any

from bson import ObjectId
from pydantic import BaseModel
from pymongo.collection import Collection

from backend.common.exeptions import NotFoundException
from backend.common.validators import validate_entity_attributes, validate_person_id


async def update_entity(entity_collection: Collection[Mapping[str, Any]], entity_id: str, update_dict: dict,
                        entity_class: type[BaseModel]):
    """Generic method to update an entity in the database."""
    entity_from_db = dict(entity_collection.find_one({"_id": entity_id}) or {})

    if not entity_from_db:
        raise NotFoundException(f"{entity_class} not found")
    validate_entity_attributes(entity_from_db, set(update_dict.keys()), entity_class.__name__)

    for key, value in update_dict.items():
        if key == "person_id":
            validate_person_id(value)
        entity_from_db[key] = value
    result = entity_collection.update_one(filter={"_id": entity_id}, update={"$set": entity_from_db})
    if 'nModified' not in result.raw_result or result.raw_result['nModified'] == 0:
        entity_from_db["id"] = str(entity_from_db["_id"])
        return entity_class(**entity_from_db)
    updated_entity = dict(entity_collection.find_one({"_id": entity_id}))
    updated_entity["id"] = str(updated_entity["_id"])
    return entity_class(**updated_entity)


async def create_entity(entity_collection: Collection[Mapping[str, Any]], entity: BaseModel,
                        created_type: type[BaseModel]):
    """Generic method to create an entity in the database."""
    entity_data = entity.model_dump()
    return await create_entity_from_data(created_type, entity_collection, entity_data)


async def create_entity_from_data(created_type, entity_collection, entity_data):
    if "person_id" in entity_data:
        validate_person_id(entity_data["person_id"])
    entity_data["_id"] = str(ObjectId())
    result = entity_collection.insert_one(entity_data)
    created_entity = dict(entity_collection.find_one({"_id": result.inserted_id}))
    if created_entity:
        created_entity["id"] = str(created_entity["_id"])
        return created_type(**created_entity)
    return None
