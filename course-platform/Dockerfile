FROM node:16-alpine3.15

# USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma migrate deploy --schema="./dist/shared/services/prisma/schema.prisma"
RUN npx prisma generate --schema="./dist/shared/services/prisma/schema.prisma"

EXPOSE 4000

CMD [ "node", "dist/server.js" ]
