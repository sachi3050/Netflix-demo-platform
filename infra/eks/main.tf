provider "aws" { region = var.region }

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = var.cluster_name
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

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}
