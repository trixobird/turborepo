variable "environment" {
  type = string
}

resource "aws_s3_bucket" "example" {
  bucket = "${var.environment}-some-forsaken-bucket"
}
