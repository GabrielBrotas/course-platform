FROM node:17.8.0 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build


RUN ["/bin/bash", "-c", "find . ! -name dist ! -name node_modules ! -name .env ! -name entrypoint.sh -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"] 

# RUN dockerize -wait tcp://postgres:5432 -timeout 60s

# RUN npx prisma migrate deploy --schema="./dist/shared/services/prisma/schema.prisma"
# RUN npx prisma generate --schema="./dist/shared/services/prisma/schema.prisma"

# EXPOSE 4000

# CMD ["entrypoint.sh"]
# CMD [ "node", "dist/server.js" ]

FROM node:17-alpine
LABEL name=course-svc
WORKDIR /usr/src/app

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh /
    
# wait for the database to be ready
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=builder /usr/src/app ./

EXPOSE 4000

CMD ["entrypoint.sh"]
