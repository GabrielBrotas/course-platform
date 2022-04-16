#!/bin/sh

docker-compose down
docker-compose up -d

cd course-service

npm install

npx prisma migrate dev --name init --schema="./src/shared/services/prisma/schema.prisma"
npx prisma generate --schema="./src/shared/services/prisma/schema.prisma" # it will update the sdk with your schema

npm run dev

cd ..

