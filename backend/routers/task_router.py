import logging
from typing import List, Any, Dict

from fastapi import APIRouter, HTTPException

from . import service_call_handler
from ..persistence.models import Task, CreateTask
from ..service.task_service import get_task_service, TaskService

LOG = logging.getLogger(__name__)


class TaskRouter:
    def __init__(self, service: TaskService):
        self.router = APIRouter()
        self.task_service = service
        # Define all crud routes
        self.router.post("/tasks/", response_model=Task)(self.create_task)
        self.router.get("/tasks/detail/{task_id}", response_model=Task)(self.read_task)
        self.router.get("/tasks/{person_id}", response_model=List[Task])(self.read_tasks)
        self.router.put("/tasks/{task_id}", response_model=Task)(self.update_task)
        self.router.delete("/tasks/{task_id}", status_code=204)(self.delete_task)

    async def create_task(self, task: CreateTask):
        return await service_call_handler(
            lambda: self.task_service.create(task))

    async def read_task(self, task_id: str):
        found_task = await self.task_service.read(task_id)
        if not found_task:
            raise HTTPException(status_code=404, detail="Task not found")
        return found_task

    async def read_tasks(self, person_id: str):
        return await self.task_service.read_all(person_id)

    async def update_task(self, task_id: str, task_update: Dict[str, Any]):
        return await service_call_handler(
            lambda: self.task_service.update(task_id, task_update))

    async def delete_task(self, task_id: str):
        return await self.task_service.delete(task_id)


# resolve dependencies and configure router
task_service = get_task_service()
task_router = TaskRouter(task_service)
