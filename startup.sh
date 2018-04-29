#!/bin/sh
cd /root/flashcards/
docker-compose -f src/main/docker/app.yml down
git pull
./mvnw verify -Pprod dockerfile:build &
docker-compose -f src/main/docker/app.yml up -d &
docker rmi $(docker images -a|grep "<none>"|awk '$1=="<none>" {print $3}')

