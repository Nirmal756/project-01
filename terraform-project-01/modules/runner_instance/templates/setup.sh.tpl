#!/bin/bash
# Log output for troubleshooting
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "Setting up ${env_name} environment..."

# 1. Simple Docker & Dependencies installation
sudo apt-get update -y
sudo apt-get install -y docker.io libicu-dev nginx
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

sudo systemctl start nginx
sudo systemctl enable nginx


# 2. GitHub Runner Installation
mkdir /home/ubuntu/actions-runner && cd /home/ubuntu/actions-runner
curl -o actions-runner-linux-x64-2.334.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.334.0/actions-runner-linux-x64-2.334.0.tar.gz

# Checksum verification
echo "048024cd2c848eb6f14d5646d56c13a4def2ae7ee3ad12122bee960c56f3d271  actions-runner-linux-x64-2.334.0.tar.gz" | shasum -a 256 -c

tar xzf ./actions-runner-linux-x64-2.334.0.tar.gz

# Fix permissions for the ubuntu user
sudo chown -R ubuntu:ubuntu /home/ubuntu/actions-runner

# 3. Configure and Run (as ubuntu user)
# Note: --unattended and --replace are added to ensure the script doesn't stop for prompts
sudo -u ubuntu ./config.sh --url ${repo_url} --token ${github_token} --name "${env_name}-runner" --unattended --replace

# Start the runner in the background
sudo -u ubuntu nohup ./run.sh &
