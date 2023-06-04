data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "policy" {
  name        = "UserBare"
  path        = "/"
  description = "Minimum rights for any user, to force picking roles"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid: "IamActions"
        Effect: "Allow",
        Action = [
          "iam:GenerateServiceLastAccessedDetails",
          "iam:GenerateCredentialReport",
          "iam:Get*",
          "iam:List*",
          "iam:CreateVirtualMFADevice",
          "iam:DeactivateMFADevice",
          "iam:DeleteVirtualMFADevice",
          "iam:EnableMFADevice",
          "iam:ResyncMFADevice",
          "iam:CreateAccessKey",
          "iam:UpdateAccessKey",
          "iam:DeleteAccessKey"
        ]
        Resource = [
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/$${aws:username}",
          "arn:aws:iam::${data.aws_caller_identity.current.account_id}:mfa/$${aws:username}"
        ]
      },
    ]
  })
}
