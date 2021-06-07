#!/bin/sh
#export $(grep -v '^#' .env | xargs -d '\n')
for var in "$@"
do
    args="$args $var"
done
eval exec "docker-compose exec php_anime php$args"
