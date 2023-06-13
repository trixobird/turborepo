variable "default_tags" {
  default = {

    Environment = "Development"
    ManagedBy   = "terraform"
    Project     = "learn-tfc-aws"

  }
  description = "Default Tags for Auto Scaling Group"
  type        = map(string)
}

terraform {
  cloud {
    organization = "happyharbor"
    workspaces {
      name = "learn-tfc-aws-dev"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.1.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = var.default_tags
  }
}

data "tfe_outputs" "prod" {
  organization = "happyharbor"
  workspace = "learn-tfc-aws-prod"
}

resource "random_id" "developers" {
  keepers = {
    bar = data.tfe_outputs.prod.values.developers
  }

  byte_length = 8
}

module "s3" {
  for_each = random_id.developers
  source = "../../modules/s3"
  environment = "${var.environment}-${each.key}"
}
