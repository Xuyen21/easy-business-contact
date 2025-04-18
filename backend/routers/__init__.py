# Module contains REST APIs following naming convention of fastapi
import logging
from typing import Callable

from fastapi import HTTPException

from backend.common.exeptions import NotFoundException, InvalidDataException

LOG = logging.getLogger(__name__)


async def service_call_handler(service_call: Callable):
    try:
        return await service_call()
    except NotFoundException as nfe:
        raise HTTPException(status_code=404, detail=nfe.message)
    except InvalidDataException as ie:
        raise HTTPException(status_code=400, detail=ie.message)
    except Exception as e:
        LOG.error(f"Error creating person: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
