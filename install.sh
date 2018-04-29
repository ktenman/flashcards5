git clone https://github.com/ktenman/flashcards5.git flashcards && cd flashcards && sudo chmod a+x mvnw && ./mvnw verify -Pprod dockerfile:build && docker-compose -f src/main/docker/app.yml up -d
