resource "aws_db_instance" "mydb" { 
  identifier             = "${var.environment}-${var.project_name}-db"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  max_allocated_storage  = 100
  
  engine                 = "postgres"
  engine_version         = "14.2"
  
  username               = var.db_username
  password               = var.db_password

  db_subnet_group_name   = module.vpc.database_subnet_group

  vpc_security_group_ids = [aws_security_group.database_sg.id]
  parameter_group_name   = "default.postgres14"
  port = 5432

  publicly_accessible    = false
  skip_final_snapshot    = true

  availability_zone = module.vpc.azs[0]

  db_name = var.db_name

  backup_retention_period = 0
  copy_tags_to_snapshot = false

  performance_insights_enabled = false
  deletion_protection = false
}

resource "aws_security_group" "database_sg" {
    depends_on = [
      module.vpc
    ]

    name = "${var.environment}-${var.project_name}-db-sg"
    description = "Allow traffic from internet"
    vpc_id = module.vpc.vpc_id

    ingress = [
        {
            description = "Allow traffic from internet"
            from_port = 5432
            to_port = 5432
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
        Name = "${var.environment}-api-alb-sg"
        Environment = var.environment
    }
}