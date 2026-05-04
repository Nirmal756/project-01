module "dev_runner" {
  source       = "./modules/runner_instance"
  env_name     = "dev"
  github_token = var.github_token
  repo_url     = var.repo_url
}

module "prod_runner" {
  source       = "./modules/runner_instance"
  env_name     = "prod"
  github_token = var.github_token
  repo_url     = var.repo_url
}
