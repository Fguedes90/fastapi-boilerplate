from prometheus_client import REGISTRY
from prometheus_client.openmetrics.exposition import CONTENT_TYPE_LATEST, generate_latest
from starlette.responses import Response
from starlette.requests import Request
from fastapi import APIRouter


router = APIRouter(tags=["metrics"],prefix="/metrics")
@router.get("/", include_in_schema=False)
def metrics(request: Request):
    return Response(generate_latest(REGISTRY), headers={"Content-Type": CONTENT_TYPE_LATEST})
