check-required-files:
	@bash -c " \
		if [ ! -f .env ]; then \
			cp .env.example.docker .env; \
		fi; \
	"

core: check-required-files

# SSH (bash) into server container.
# Useful for running Django shell commands.
bash: core
	docker-compose -f docker-compose.backend.node.yml exec zettablock bash

# SSH (bash) into database container.
# Useful for running commands directly against database.
bashdb: core
	docker-compose -f docker-compose.backend.node.yml exec db bash

# Drop the local database.
cleandb: core
	docker-compose -f docker-compose.backend.node.yml exec db psql -h db -U postgres -c "DROP DATABASE IF EXISTS zettablock"

# SSH (postgres shell) into database container.
# Useful for running postgres commands.
dbshell: core
	docker-compose -f docker-compose.backend.node.yml exec db psql -U postgres

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
node-build: core
	docker-compose -f docker-compose.backend.node.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
node-start: core
	docker-compose -f docker-compose.backend.node.yml up $(ARGS)

# Stop docker containers.
node-stop: core
	docker-compose -f docker-compose.backend.node.yml stop

# Remove docker containers (if they exist)
# Run this with --rmi all to remove the mysql image too
node-clean: core
	docker-compose -f docker-compose.backend.node.yml down --rmi local

help:
	@echo  ''
	@echo  ' Targets:'
	@echo  ''
	@echo  '  bash           			- SSH (bash) into server container.'
	@echo  '  bashdb                	- SSH (bash) into database container.'
	@echo  '  cleandb      				- Drop the local database.'
	@echo  '  dbshell    				- SSH (postgres shell) into database container.'
	@echo  '  node-build      			- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  node-start				- Start docker containers.'
	@echo  '  node-stop     			- Stop docker containers.'
	@echo  '  node-clean    			- Remove docker containers (if they exist)'
