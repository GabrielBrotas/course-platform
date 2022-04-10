FROM node:17.8.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

RUN npx prisma migrate deploy --schema="./dist/shared/services/prisma/schema.prisma"
RUN npx prisma generate --schema="./dist/shared/services/prisma/schema.prisma"

EXPOSE 4000

CMD [ "node", "dist/server.js" ]