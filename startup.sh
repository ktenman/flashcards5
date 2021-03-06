#!/bin/sh
docker rmi $(docker images -a|grep "<none>"|awk '$1=="<none>" {print $3}')
cd /root/flashcards/
docker-compose -f src/main/docker/app.yml down
git pull
./mvnw verify -Pprod dockerfile:build
docker rmi $(docker images -a|grep "<none>"|awk '$1=="<none>" {print $3}')
/usr/local/bin/docker-compose -f /root/flashcards/src/main/docker/app.yml up -d
