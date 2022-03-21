up:
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
remake:
	@make destroy
	@make up
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
destroy-volumes:
	docker compose down --volumes --remove-orphans
ps:
	docker compose ps
logs:
	docker compose logs
log-app:
	docker compose logs app
log-app-watch:
	docker compose logs --follow app
bash:
	docker compose exec app bash
app:
	docker compose exec app bundle install
	docker compose exec app bundle exec rails s -p 3000 -b '0.0.0.0'