# Terraform block
terraform {
    required_version = "~> 1.1" # alows 1.1.xx and deny 1.0xx and 1.2.xx

    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.0"
        }
    }

    backend "s3" {}
}


provider "aws" {
    region = var.aws_region
}
