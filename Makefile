.PHONY: build build-push test test-local generate-client deploy up down logs setup backend-install frontend-install precommit-install lint clean

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
	docker-compose up -d

down:
	@echo "Parando e removendo os containers..."
	docker-compose down -v --remove-orphans

logs:
	@echo "Exibindo logs..."
	docker-compose logs -f
