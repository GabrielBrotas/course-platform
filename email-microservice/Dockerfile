FROM node:16-alpine3.15

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli@7.4.1

# USER node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "start"]