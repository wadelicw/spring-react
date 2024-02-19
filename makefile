build:
	docker-compose down --volumes
	docker-compose up --build --force-recreate --no-deps -d
	docker-compose logs -f --tail=100