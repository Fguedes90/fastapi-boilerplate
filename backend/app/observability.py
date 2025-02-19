from fastapi import FastAPI
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from typing import Optional

def setup_telemetry(
    app: FastAPI,
    app_name: str,
    otlp_endpoint: str,
    enable_logging: bool = True,
    enable_request_tracing: bool = True,
) -> Optional[TracerProvider]:
    """
    Configure OpenTelemetry instrumentation for the application.
    
    Args:
        app: FastAPI application instance
        app_name: Name of the service/application
        otlp_endpoint: OTLP exporter endpoint
        enable_logging: Whether to enable log correlation
        enable_request_tracing: Whether to enable request tracing
    """
    resource = Resource.create(attributes={"service.name": app_name})
    tracer = TracerProvider(resource=resource)
    trace.set_tracer_provider(tracer)
    
    # Configure OTLP exporter
    otlp_exporter = OTLPSpanExporter(endpoint=otlp_endpoint, insecure=True)
    tracer.add_span_processor(BatchSpanProcessor(otlp_exporter))
    
    # Set up instrumentation
    if enable_logging:
        LoggingInstrumentor().instrument(set_logging_format=True)
    
    if enable_request_tracing:
        FastAPIInstrumentor.instrument_app(app, tracer_provider=tracer)
    
    return tracer
