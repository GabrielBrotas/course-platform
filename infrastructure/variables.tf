variable "aws_region" {
    description = "Region in which AWS resources will be deployed"
    type = string
    default = "us-east-1"
}

variable "environment" {
    description = "Environment used as prefix"
    type = string
    default = "dev"
}

variable "project_name" {
    description = "Project name used as prefix"
    type = string
    default = "course-service"
}

variable "public_subnets" {
    description = "List of instance types to launch"
    type = list
    default = ["t2.micro", "t2.small", "t2.medium"]
}

variable "vpc_cidr" {
    description = "CIDR block for the VPC"
    type = string
}

variable "vpc_public_subnets_cidr" {
    description = "CIDR block for the Public Subnets"
    type = list
}

variable "vpc_private_subnets_cidr" {
    description = "CIDR block for the Private Subnets"
    type = list
}

variable "vpc_database_subnets_cidr" {
    description = "CIDR block for the Database Subnets"
    type = list
}

variable "instance_type_map" {
    description = "Map of instance types to launch"
    type = map
    default = {
        "dev" = "t2.micro",
        "prod" = "t2.small",
        "qa" = "t2.medium",
    }
}

variable "instance_keypair_map" {
    description = "Map of instance types to launch"
    type = map
    default = {
        "dev" = "course-platform",
        "prod" = "course-platform",
        "qa" = "course-platform",
    }
}

variable "db_username" {
    description = "Database username"
    type = string
    sensitive = true
}

variable "db_password" {
    description = "Database password"
    type = string
    sensitive = true
}

variable "db_name" {
    description = "Database name"
    type = string
    sensitive = true
}