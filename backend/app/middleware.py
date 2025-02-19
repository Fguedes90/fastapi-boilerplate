import time
from typing import Callable
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from prometheus_client import Counter, Histogram

REQUESTS = Counter(
    "http_requests_total",
    "Total count of HTTP requests",
    ["method", "path", "app_name"]
)
REQUESTS_PROCESSING_TIME = Histogram(
    "http_request_duration_seconds",
    "HTTP request duration in seconds",
    ["method", "path", "app_name"]
)

class PrometheusMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: Callable, app_name: str = "fastapi-app") -> None:
        super().__init__(app)
        self.app_name = app_name

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        method = request.method
        path = request.url.path

        REQUESTS.labels(
            method=method, path=path, app_name=self.app_name
        ).inc()

        start_time = time.perf_counter()
        response = await call_next(request)
        duration = time.perf_counter() - start_time

        REQUESTS_PROCESSING_TIME.labels(
            method=method, path=path, app_name=self.app_name
        ).observe(duration)

        return response
