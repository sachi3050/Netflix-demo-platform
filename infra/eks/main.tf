provider "aws" { region = "ap-south-1" }

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "sachi_123"
  cluster_version = "1.27"
  subnets         = var.subnets
  vpc_id          = var.vpc_id

  node_groups = {
    default = {
      desired_capacity = 3
      max_capacity     = 5
      min_capacity     = 2
      instance_type    = "t3.medium"
    }
  }
}
