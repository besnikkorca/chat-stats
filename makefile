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
frontend-build: core
	docker-compose -f docker-compose.frontend.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
frontend-start: core
	docker-compose -f docker-compose.frontend.yml up $(ARGS)

# Stop docker containers.
frontend-stop: core
	docker-compose -f docker-compose.frontend.yml stop

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
frontend-storybook-build: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
frontend-storybook-start: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml up $(ARGS)

# Stop docker containers.
frontend-storybook-stop: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml stop

# Opens a shell in the running storybook container. Useful for installing packages.
frontend-storybook-bash: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml exec zettablock-storybook bash

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
fullstack-build: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml -f docker-compose.backend.node.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
fullstack-start: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml -f docker-compose.backend.node.yml up $(ARGS)

# Stop docker containers.
fullstack-stop: core
	docker-compose -f docker-compose.frontend.yml -f docker-compose.storybook.yml -f docker-compose.backend.node.yml stop

# Opens a shell in the running frontend container. Useful for installing packages.
frontend-bash: core
	docker-compose -f docker-compose.frontend.yml exec zettablock-frontend bash

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
storybook-build: base
	docker-compose -f docker-compose.storybook.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
storybook-start: base
	docker-compose -f docker-compose.storybook.yml up $(ARGS)

# Stop docker containers.
storybook-stop: base
	docker-compose -f docker-compose.storybook.yml stop

# Opens a shell in the running storybook container. Useful for installing packages.
storybook-bash: base
	docker-compose -f docker-compose.storybook.yml exec zettablock-storybook bash
	
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

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
storybook-build: core
	docker-compose -f docker-compose.storybook.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
storybook-start: core
	docker-compose -f docker-compose.storybook.yml up $(ARGS)

# Stop docker containers.
storybook-stop: core
	docker-compose -f docker-compose.storybook.yml stop

# Opens a shell in the running storybook container. Useful for installing packages.
storybook-bash: core
	docker-compose -f docker-compose.storybook.yml exec zettablock-storybook bash

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
	@echo  '  frontend-build     		- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  frontend-start    		- Start docker containers.'
	@echo  '  frontend-stop     		- Stop docker containers.'
	@echo  '  frontend-bash             - Opens a shell in the running frontend container. Useful for installing packages.'
	@echo  '  frontend-storybook-build     		- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  frontend-storybook-start    		- Start docker containers.'
	@echo  '  frontend-storybook-stop     		- Stop docker containers.'
	@echo  '  frontend-storybook-bash             - Opens a shell in the running frontend container. Useful for installing packages.'
	@echo  '  fullstack-node-build    - Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  fullstack-node-start    - Start docker containers.'
	@echo  '  fullstack-node-stop     - Stop docker containers'
	@echo  '  storybook-build     		- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  storybook-start    		- Start docker containers.'
	@echo  '  storybook-stop     		- Stop docker containers.'
	@echo  '  storybook-bash             - Opens a shell in the running frontend container. Useful for installing packages.'
