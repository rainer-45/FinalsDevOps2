resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = var.key_name
  public_key = tls_private_key.example.public_key_openssh
}

resource "local_file" "TF-key" {
  content = tls_private_key.example.private_key_pem
  filename = "controller_agent_key" 
}
