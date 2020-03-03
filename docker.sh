#!/bin/sh
docker-compose up -d
alias anime="docker-compose exec parse_app php"