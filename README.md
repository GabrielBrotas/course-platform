
## How to run

**Local Environment**
```bash
  yarn
  docker-compuse up -d

  npx prisma migrate dev --name init --schema="./src/shared/services/prisma/schema.prisma"
  npx prisma generate # it will update the sdk with your schema

  # init locally
  yarn dev
```

**AWS Dev Environment**
 **1 - Create S3 Bucket**
    **- Name**: course-platform-terraform-state
    **- Region**: us-east-1
    **- Object Ownership**: ACLs disabled
    **- Block Public Access settings for this bucket**: Block all public access
    **- Bucket Versioning**: Enabled
    **- Create Bucket**
    - Create a "dev" folder

 **2 - Create DynamoDB Table**
    **- Name**: dev-course-platform-tfstate
    **- Partition key**: LockID
    Leave all the rest default
    **- Create Table**

 **2- Setup Github Repository Secrets**
    - AWS_ACCESS_KEY_ID -> aws user access key
    - AWS_SECRET_ACCESS_KEY -> aws user secret key
    - TF_API_TOKEN -> terraform account api token

```bash
  cd infrastructure 
  terraform init -backend-config=./environments/dev.tfbackend
  terraform validate -no-color 
  terraform plan -var-file=./dev.tfvars
  terraform apply -auto-approve -var-file=./dev.tfvars

  npm install
  npm run build
  echo $'DATABASE_URL=postgresql://postgres:postgres123@course-platform.c9pacmppdwgk.us-east-1.rds.amazonaws.com:5432/courseplatform' > .env
  npx prisma migrate deploy --schema="./dist/shared/services/prisma/schema.prisma"

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

