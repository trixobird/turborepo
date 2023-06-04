locals {
  developers = ["giorgos", "eleni"]
}

data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "user_bare_policy" {
  name        = "UserBare"
  path        = "/"
  description = "Minimum rights for any user, to force picking roles"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Sid : "IamUserActions"
        Effect : "Allow",
        Action = [
          "iam:GenerateServiceLastAccessedDetails",
          "iam:GenerateCredentialReport",
          "iam:Get*",
          "iam:List*",
          "iam:CreateAccessKey",
          "iam:UpdateAccessKey",
          "iam:DeleteAccessKey"
        ]
        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/$${aws:username}",
        ]
      },
      {
        Sid : "IamMFAActions"
        Effect : "Allow",
        Action = [
          "iam:CreateVirtualMFADevice",
          "iam:DeactivateMFADevice",
          "iam:DeleteVirtualMFADevice",
          "iam:EnableMFADevice",
          "iam:ResyncMFADevice",
        ]
        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:mfa/$${aws:username}"
        ]
      }
    ]
  })
}

resource "aws_iam_user" "developers" {
  for_each      = toset(local.developers)
  name          = each.key
  force_destroy = true
}

resource "aws_iam_user_policy_attachment" "bare_policy_attach" {
  for_each   = aws_iam_user.developers
  user       = each.key
  policy_arn = aws_iam_policy.user_bare_policy.arn
}


resource "aws_iam_role" "developer_role" {
  name        = "developer"
  description = "View access in all services, write access in non production services"

  managed_policy_arns  = ["arn:aws:iam::aws:policy/PowerUserAccess"]
  max_session_duration = 43200
  assume_role_policy   = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Sid       = ""
        Principal = {
          Service = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Condition = {
          Bool = {
            "aws:MultiFactorAuthPresent" : "true"
          }
        }
      },
    ]
  })
}

resource "aws_iam_policy" "developer_assume_policy" {
  name        = "DeveloperAssumePolicy"
  path        = "/"
  description = "Policy that allows developers to assume the developer role"

  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Sid : "DeveloperAssume"
        Effect : "Allow",
        Action   = ["sts:AssumeRole"]
        Resource = [
          aws_iam_role.developer_role.arn
        ]
      },
    ]
  })
}

resource "aws_iam_group" "developers_group" {
  name = "developers"
}

resource "aws_iam_user_group_membership" "developers_membership" {
  for_each = aws_iam_user.developers
  user     = each.key

  groups = [
    aws_iam_group.developers_group.name,
  ]
}
