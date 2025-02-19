from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import Resource
from prometheus_client import REGISTRY, start_http_server

from app.api.main import api_router
from app.core.config import settings
from app.middleware import PrometheusMiddleware

def setup_observability(app: FastAPI):
    # Configure OpenTelemetry
    resource = Resource.create({"service.name": settings.SERVICE_NAME})
    tracer_provider = TracerProvider(resource=resource)

    # Configure OTLP exporter for Tempo
    otlp_exporter = OTLPSpanExporter(endpoint=settings.OTLP_ENDPOINT, insecure=True)
    tracer_provider.add_span_processor(BatchSpanProcessor(otlp_exporter))

    # Set the tracer provider
    trace.set_tracer_provider(tracer_provider)
    
    # Instrument logging with OpenTelemetry
    LoggingInstrumentor().instrument(set_logging_format=True)
    
    # Instrument FastAPI with OpenTelemetry
    FastAPIInstrumentor.instrument_app(app)

    # Add Prometheus middleware and configure metrics
    if settings.ENABLE_METRICS:
        app.add_middleware(PrometheusMiddleware, app_name=settings.SERVICE_NAME)

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# Set up observability
setup_observability(app)

# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
