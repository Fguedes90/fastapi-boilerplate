import time
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from prometheus_client import Counter, Histogram

REQUESTS = Counter(
    "fastapi_requests_total", "Contagem de requisições", ["method", "path", "app_name"]
)
REQUESTS_PROCESSING_TIME = Histogram(
    "fastapi_requests_duration_seconds", "Tempo de processamento", ["method", "path", "app_name"]
)

class PrometheusMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, app_name: str = "backend"):
        super().__init__(app)
        self.app_name = app_name

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
        method = request.method
        path = request.url.path
        REQUESTS.labels(method=method, path=path, app_name=self.app_name).inc()
        start_time = time.perf_counter()
        response = await call_next(request)
        elapsed = time.perf_counter() - start_time
        REQUESTS_PROCESSING_TIME.labels(method=method, path=path, app_name=self.app_name).observe(elapsed)
        return response
