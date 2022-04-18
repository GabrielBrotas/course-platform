#!/bin/sh

npx prisma migrate deploy --schema="./dist/shared/services/prisma/schema.prisma"
npx prisma generate --schema="./dist/shared/services/prisma/schema.prisma"

node dist/server.js