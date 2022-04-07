resource "aws_instance" "ec2_api" {
    ami = "ami-03e0b06f01d45a4eb"
    instance_type = var.instance_type_map[var.environment]

    subnet_id = module.vpc.private_subnets[0]
    
    key_name = var.instance_keypair_map[var.environment]

    user_data = <<EOF
#!/bin/bash
sudo yum update -y
sudo yum install docker -y

# install nodejs
sudo curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -

sudo yum install -y git
    EOF

    associate_public_ip_address = false
    
    vpc_security_group_ids = [ aws_security_group.api_app_sg.id ]

    tags = {
        Name = "${var.environment}-${var.project_name}-instance"
        Environment = "${var.environment}"
    }
}

resource "aws_instance" "ec2_public" {
    ami = "ami-03e0b06f01d45a4eb"
    instance_type = var.instance_type_map[var.environment]

    subnet_id = module.vpc.public_subnets[0]
    
    key_name = var.instance_keypair_map[var.environment]

    user_data = file("${path.module}/scripts/ec2-tools.sh")

    associate_public_ip_address = true
    
    vpc_security_group_ids = [ aws_security_group.ec2_public_sg.id ]

    tags = {
        Name = "${var.environment}-${var.project_name}-public-instance"
        Environment = "${var.environment}"
    }
}


# resource "aws_iam_role" "ecs_task_role" {
#     name = "${var.environment}-ecs-api-role"
#     path = "/"

#     assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#   {
#     "Action": "sts:AssumeRole",
#     "Principal": {
#       "Service": "ecs-tasks.amazonaws.com"
#     },
#     "Effect": "Allow",
#     "Sid": "ECSTaskAssumeRole"
#   }
#   ]
# }
# EOF
# }

# resource "aws_iam_policy" "ecs_api_policy" {
#     name = "${var.environment}-ecs-api-policy"
#     path = "/"
#     description = "IAM Policy to API"
#     policy = data.aws_iam_policy_document.api_policy_document.json
# }

# data "aws_iam_policy_document" "api_policy_document" {
#     statement {
#       sid = "AllowECRPull"
#       actions = [ "ecr:*" ]
#       resources = [ "${aws_ecr_repository.api_boilerplate_repository.arn}" ]
#     }

#     statement {
#         actions = [ 
#             "ecr:GetAuthorizationToken",
#             "ecr:BatchCheckLayerAvailability",
#             "ecr:GetDownloadUrlForLayer",
#             "ecr:BatchGetImage",
#             "logs:CreateLogStream",
#             "logs:PutLogEvents",
#         ]
#         resources = [ "*" ]
#     }

#     statement {
#         sid = "AllowCloudWatchLogs"
#         actions = [ "logs:*" ]
#         resources = [ "*" ]
#     }
# }

# resource "aws_iam_policy_attachment" "ecs_api_policy_attachement" {
#     name = "${var.environment}-ecs-api-policy-attachement"
#     roles = [aws_iam_role.ecs_task_role.name]
#     policy_arn = aws_iam_policy.ecs_api_policy.arn
# }

resource "aws_security_group" "api_app_sg" {
    depends_on = [
      module.vpc
    ]
    
    name = "${var.environment}-${var.project_name}-sg-api"
    description = "Allow traffic from alb to api"
    vpc_id = module.vpc.vpc_id

    ingress = [
        {
            description = "Allow traffic from alb"
            from_port = 4000
            to_port = 4000
            protocol = "tcp"
            cidr_blocks = []
            ipv6_cidr_blocks = []
            prefix_list_ids = []
            security_groups = [aws_security_group.api_alb_sg.id]
            self = false
        },
        {
            description = "Allow ssh from anywhere"
            from_port = 22
            to_port = 22
            protocol = "tcp"
            cidr_blocks = [module.vpc.vpc_cidr_block]
            ipv6_cidr_blocks = []
            prefix_list_ids = []
            security_groups = []
            self = false
        }
    ]

    egress = [
        {
            description = "Allow all outbound traffic"
            from_port = 0
            to_port = 0
            protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
            ipv6_cidr_blocks = []
            prefix_list_ids = []
            security_groups = []
            self = false
        }
    ]

    tags = {
        Name = "${var.environment}-${var.project_name}-sg-api"
        Environment = "${var.environment}"
    }
}

resource "aws_security_group" "ec2_public_sg" {
    name = "${var.environment}-${var.project_name}-sg-public-ec2"
    description = "Allow ssh from everywhere"
    vpc_id = module.vpc.vpc_id

    ingress = [
        {
            description = "Allow ssh from anywhere"
            from_port = 22
            to_port = 22
            protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
            ipv6_cidr_blocks = []
            prefix_list_ids = []
            security_groups = []
            self = false
        }
    ]

    egress = [
        {
            description = "Allow all outbound traffic"
            from_port = 0
            to_port = 0
            protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
            ipv6_cidr_blocks = []
            prefix_list_ids = []
            security_groups = []
            self = false
        }
    ]

    tags = {
        Name = "${var.environment}-${var.project_name}-sg-public-ec2"
        Environment = "${var.environment}"
    }
}


output "api_instance_id" {
    value = aws_instance.ec2_api.id
}

output "api_private_ip" {
    value = aws_instance.ec2_api.private_ip
}