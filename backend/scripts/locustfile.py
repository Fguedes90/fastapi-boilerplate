from locust import HttpUser, task, between

class BackendUser(HttpUser):
    # Intervalo entre as requisições
    wait_time = between(1, 5)

    @task(1)
    def openapi(self):
        # Testa o endpoint de openapi (conforme definido em settings.API_V1_STR)
        self.client.get("/api/v1/openapi.json", name="openapi")

    @task(2)
    def metrics(self):
        # Testa o endpoint de métricas
        self.client.get("/metrics", name="metrics")

    # Caso possua outros endpoints na sua API, adicione novas tasks abaixo
    # @task(X)
    # def outro_endpoint(self):
    #     self.client.get("caminho/do/endpoint", name="descrição")
