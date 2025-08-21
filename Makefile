# Makefile for Murmur Twitter Clone

.PHONY: help build up down restart logs shell clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make build    - Build Docker containers"
	@echo "  make up       - Start all services"
	@echo "  make down     - Stop all services"
	@echo "  make restart  - Restart all services"
	@echo "  make logs     - Show logs from all services"
	@echo "  make shell    - Open shell in Rails container"
	@echo "  make clean    - Clean up containers and volumes"
	@echo "  make test     - Run tests"
	@echo "  make console  - Open Rails console"

# Build Docker containers
build:
	docker-compose build

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# Restart all services
restart: down up

# Show logs from all services
logs:
	docker-compose logs -f

# Open shell in Rails container
shell:
	docker-compose exec web bash

# Open Rails console
console:
	docker-compose exec web bundle exec rails console

# Run tests
test:
	docker-compose exec web bundle exec rspec

# Clean up containers and volumes
clean:
	docker-compose down -v
	docker-compose rm -f
	docker volume prune -f

# Start services and show logs
dev: up logs

# Rebuild and start fresh
fresh: clean build up logs
