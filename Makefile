.PHONY: build build-push test test-local generate-client deploy up down logs setup backend-install frontend-install precommit-install lint clean obs-up obs-down obs-logs

build:
	@echo "Construindo as imagens..."
	sh scripts/build.sh

build-push:
	@echo "Construindo e enviando as imagens..."
	sh scripts/build-push.sh

test:
	@echo "Executando testes..."
	sh scripts/test.sh

test-local:
	@echo "Executando testes localmente..."
	sh scripts/test-local.sh

generate-client:
	@echo "Gerando client da API..."
	sh scripts/generate-client.sh

deploy:
	@echo "Fazendo deploy da stack..."
	sh scripts/deploy.sh

up:
	@echo "Subindo os containers..."
	docker network create traefik-public || true
	docker network create observability || true
	docker-compose -f docker-compose.observability.yml up -d
	docker-compose up -d

down:
	@echo "Parando e removendo os containers..."
	docker-compose down
	docker-compose -f docker-compose.observability.yml down
	docker-compose -f docker-compose.traefik.yml down
	docker network rm observability || true
    
backend-install:
	@echo "Instalando dependências do backend (uv sync)..."
	cd backend && uv sync

backend-dev:
	@echo "Executando configurações necessárias para desenvolvimento..."
	make backend-install && source ./.venv

frontend-install:
	@echo "Instalando dependências do frontend (npm install)..."
	cd frontend && npm install

precommit-install:
	@echo "Instalando hooks do pre-commit..."
	pre-commit install

setup: backend-install frontend-install precommit-install
	@echo "Setup inicial concluído."

loki-driver:
	@echo "Instalando driver loki..."
	docker plugin install grafana/loki-docker-driver:2.9.2 --alias loki --grant-all-permissions

lint:
	@echo "Executando lint (pre-commit)..."
	pre-commit run --all-files

clean:
	@echo "Limpando artefatos e volumes..."
	docker-compose down -v --remove-orphans
	@echo "Removendo diretórios __pycache__..."
	find . -type d -name '__pycache__' -exec rm -rf {} +

obs-up:
	docker-compose -f docker-compose.observability.yml up -d

obs-down:
	docker-compose -f docker-compose.observability.yml down

obs-logs:
	docker-compose -f docker-compose.observability.yml logs -f

test-local:
	@echo "Executando testes localmente..."
	sh scripts/test-local.sh