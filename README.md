
## How to run
```bash
  yarn
  docker-compuse up -d

  npx prisma migrate dev --name init
  npx prisma generate # it will update the sdk with your schema
```

## Clean up
```bash
  docker-compuse down
```

## Features
- users
  - [X] user should be able to login
  - [X] user should be able to register
  - [ ] user should receive an email when register
  - [ ] user should be able to enroll in a course
  - [ ] user should receive an email when enroll in a course

- courses
  - [ ] an administrator should be able to create a course
  - [ ]
