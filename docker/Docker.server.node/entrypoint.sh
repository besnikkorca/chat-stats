#!/bin/bash

set -e

function migrate {
    if psql -h db -U postgres -lqt | cut -d \| -f 1 | grep -qw ${POSTGRES_GM_DB}; then
        echo "Database exists. Not creating"
    else
        psql -h db -U postgres -c "CREATE DATABASE ${POSTGRES_GM_DB}"
    fi
    yarn migrate
}

function seed {
    # TODO: add condition to check if there are any entries in db
    # seed only if db is empty
    yarn seed
}

function run {
    yarn start
}

function dev {
    yarn start:dev
}

function development {
    migrate
    seed
    dev
}

# Wait for the postgres container to actually be up and running
until psql -h db -U postgres -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

eval "$@"
