# 1. Generate the Private Key
resource "tls_private_key" "key" {
  algorithm = "ED25519"
}

# 2. Register the Public Key with AWS
resource "aws_key_pair" "generated_key" {
  key_name   = "runner-key-${var.env_name}"
  public_key = tls_private_key.key.public_key_openssh
}

# 3. Save the Private Key locally as a .pem file
resource "local_file" "private_key_pem" {
  content         = tls_private_key.key.private_key_pem
  filename        = "${var.env_name}-key.pem"
  file_permission = "0400"
}

# 4. Get the Default VPC
data "aws_vpc" "default" {
  default = true
}

# 5. Security Group for SSH
resource "aws_security_group" "ssh" {
  name        = "allow-ssh-${var.env_name}"
  description = "Allow SSH access for ${var.env_name}"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allows anyone to see the web page
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 6. The EC2 Instance
resource "aws_instance" "this" {
  ami           = "ami-07a00cf47dbbc844c" # Ubuntu 22.04 LTS
  instance_type = var.instance_type

  # Reference the generated key pair
  key_name = aws_key_pair.generated_key.key_name

  vpc_security_group_ids = [aws_security_group.ssh.id]

  user_data = templatefile("${path.module}/templates/setup.sh.tpl", {
    env_name     = var.env_name
    github_token = var.github_token
    repo_url     = var.repo_url
  })

  tags = {
    Name = "runner-${var.env_name}"
  }
}

# 7. Output the IP
output "public_ip" {
  value = aws_instance.this.public_ip
}
