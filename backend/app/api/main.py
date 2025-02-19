from fastapi import APIRouter

from app.api.routes import items, login, private, users, utils, metrics
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)
api_router.include_router(metrics.router)  # Remove the prefix

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
