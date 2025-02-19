from prometheus_client import REGISTRY
from prometheus_client.openmetrics.exposition import CONTENT_TYPE_LATEST, generate_latest
from starlette.responses import Response
from starlette.requests import Request
from fastapi import APIRouter

router = APIRouter(tags=["metrics"])

@router.get("/metrics", include_in_schema=False)
async def metrics(request: Request) -> Response:
    """Endpoint that serves Prometheus metrics"""
    return Response(
        generate_latest(REGISTRY),
        media_type=CONTENT_TYPE_LATEST
    )
