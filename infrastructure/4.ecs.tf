resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.environment}-${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}


resource "aws_iam_role" "ecs_task_role" {
    name = "${var.environment}-${var.project_name}-ecs-role"
    path = "/"

    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
  {
    "Action": "sts:AssumeRole",
    "Principal": {
      "Service": "ecs-tasks.amazonaws.com"
    },
    "Effect": "Allow",
    "Sid": "ECSTaskAssumeRole"
  }
  ]
}
EOF
}

resource "aws_iam_policy" "ecs_api_policy" {
    name = "${var.environment}-${var.project_name}-cluster-policy"
    path = "/"
    description = "IAM Policy to API"
    policy = data.aws_iam_policy_document.api_policy_document.json
}

data "aws_iam_policy_document" "api_policy_document" {
    statement {
      sid = "AllowECRPull"
      actions = [ "ecr:*" ]
      resources = [ "${aws_ecr_repository.api_boilerplate_repository.arn}" ]
    }

    statement {
        actions = [ 
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
        ]
        resources = [ "*" ]
    }

    statement {
        sid = "AllowCloudWatchLogs"
        actions = [ "logs:*" ]
        resources = [ "*" ]
    }
}

resource "aws_iam_policy_attachment" "ecs_api_policy_attachement" {
    name = "${var.environment}-${var.project_name}-policy-attachement"
    roles = [aws_iam_role.ecs_task_role.name]
    policy_arn = aws_iam_policy.ecs_api_policy.arn
}

resource "aws_ecs_task_definition" "ecs_api_task_definition" {
    family = "${var.environment}-${var.project_name}-td"
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"
    cpu = 256
    memory = 512
    execution_role_arn = aws_iam_role.ecs_task_role.arn
    task_role_arn = aws_iam_role.ecs_task_role.arn
    
    container_definitions = jsonencode([
        {
            "name" = "my-api",
            "image" = "${aws_ecr_repository.api_boilerplate_repository.repository_url}:latest",
            "portMappings" = [
                {
                    "containerPort" = 4000
                }
            ],
            "environment" = [
                {
                    "name" = "ENVIRONMENT",
                    "value" = "${var.environment}",
                }
            ]
        }
    ])
}

resource "aws_security_group" "api_app_sg" {
    name = "${var.environment}-api-app-sg"
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
        Name = "${var.environment}-api-app-sg"
        Environment = "${var.environment}"
    }
}

resource "aws_ecs_service" "api_ecs_service" {
    name = "${var.environment}-${var.project_name}-service"
    cluster = aws_ecs_cluster.ecs_cluster.id
    task_definition = aws_ecs_task_definition.ecs_api_task_definition.arn
    desired_count = 2
    health_check_grace_period_seconds = 20
    launch_type = "FARGATE"
    deployment_minimum_healthy_percent = 100
    deployment_maximum_percent = 200
    scheduling_strategy = "REPLICA"

    network_configuration {
        subnets = module.vpc.private_subnets
        security_groups = [aws_security_group.api_app_sg.id]
        # assign_public_ip = true
    }

    load_balancer {
        target_group_arn = aws_lb_target_group.api-target-group.arn
        container_name = "my-api"
        container_port = 4000
    }
}

output "ecs_cluster_id" {
    value = aws_ecs_cluster.ecs_cluster.id
}