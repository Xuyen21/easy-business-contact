from . import update_entity, create_entity
from ..common.exeptions import NotFoundException
from ..persistence.database import get_tasks_collection
from ..persistence.models import Task, CreateTask


class TaskService:
    def __init__(self):
        self.tasks_collection = get_tasks_collection()

    async def create(self, task: CreateTask):
        return await create_entity(self.tasks_collection, task, Task)

    async def read(self, task_id):
        task = self.tasks_collection.find_one({"_id": task_id})
        if task:
            task["id"] = str(task["_id"])
            return Task(**task)
        return None

    async def read_all(self, person_id: str):
        tasks = list(self.tasks_collection.find({"person_id": person_id}))
        for task in tasks:
            task["id"] = str(task["_id"])
        return [Task(**task) for task in tasks]

    async def update(self, task_id, task_update):
        return await update_entity(self.tasks_collection, task_id, task_update, Task)

    async def delete(self, task_id):
        result = self.tasks_collection.delete_one({"_id": task_id})
        if result.deleted_count == 0:
            raise NotFoundException("Task not found")
        return {"message": "deleted", "id": task_id}


def get_task_service():
    return TaskService()
