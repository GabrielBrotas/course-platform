environment = "dev"
aws_region = "us-east-1"
vpc_cidr = "10.10.0.0/16"
vpc_public_subnets_cidr = ["10.10.0.0/24", "10.10.1.0/24"]
vpc_private_subnets_cidr = ["10.10.2.0/24", "10.10.3.0/24"]
vpc_database_subnets_cidr = ["10.10.4.0/24", "10.10.5.0/24"]

db_username = "postgres"
db_password = "postgres123"
db_name = "courseplatform"