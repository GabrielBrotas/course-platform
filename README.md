
## How to run

Dev Environment
```bash
  yarn
  docker-compuse up -d

  npx prisma migrate dev --name init --schema="./src/shared/services/prisma/schema.prisma"
  npx prisma generate # it will update the sdk with your schema

  # init locally
  yarn dev
```

Prod Environment
```bash
  npm install

  npx prisma migrate deploy --schema="./src/shared/services/prisma/schema.prisma"

  # init locally
  yarn dev
  # init using container
  docker build -t course-platform:latest .
  docker container run -d -p 4000:4000 course-platform:latest
```

## Clean up
```bash
  docker-compuse down
```

## Features
- students
  - [X] student should be able to login
  - [X] student should be able to register
  - [ ] student should receive an email when register
  - [X] student should be able to enroll in a course
  - [ ] student should receive an email when enroll in a course

- courses
  - [X] an administrator should be able to create a course
