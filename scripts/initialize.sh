#!/usr/bin/env bash
echo 'Creating .env file...'
touch .env

echo 'Starting MongoDB container...'
docker compose -f ./docker/docker-compose.dependencies.yml up -d canny-games-mongo-local

echo 'Sleeping 10 seconds to allow MongoDB container to start...'
sleep 10

echo 'Initializing MongoDB replica set...'
docker compose -f ./docker/docker-compose.dependencies.yml exec canny-games-mongo-local mongosh --eval "printjson(rs.initiate())"

echo 'Sleeping 10 seconds to allow MongoDB replica set to initialize...'
sleep 10

echo 'Shutting down MongoDB container...'
docker compose -f ./docker/docker-compose.dependencies.yml down canny-games-mongo-local
