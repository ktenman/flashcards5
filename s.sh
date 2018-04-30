./mvnw verify -Pprod dockerfile:build && docker-compose -f src/main/docker/app.yml up -d
