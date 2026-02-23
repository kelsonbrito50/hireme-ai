.PHONY: help install dev build test lint format type-check clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

test: ## Run tests
	npm test

lint: ## Run ESLint
	npm run lint

format: ## Format with Prettier
	npx prettier --write .

type-check: ## Run TypeScript type checking
	npx tsc --noEmit

clean: ## Remove build artifacts
	rm -rf .next out node_modules/.cache

docker-up: ## Start with Docker Compose
	docker-compose up --build

docker-down: ## Stop Docker Compose
	docker-compose down

db-migrate: ## Run Prisma migrations
	npx prisma migrate dev

db-studio: ## Open Prisma Studio
	npx prisma studio
