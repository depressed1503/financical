#!/bin/bash
set -e

echo "=== Deploying Financical ==="

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="/var/www/financical"
NGINX_AVAILABLE="/etc/nginx/sites-available/financical"
NGINX_ENABLED="/etc/nginx/sites-enabled/financical"
NGINX_SOURCE="$PROJECT_DIR/deploy/nginx/financical"

echo "Stopping existing containers..."
docker compose down

echo "Starting backend and database..."
docker compose up -d --build pgdb back

echo "Building frontend..."
docker compose build front_builder

echo "Preparing frontend directory..."
sudo mkdir -p "$FRONTEND_DIR"
sudo rm -rf "$FRONTEND_DIR"/*

echo "Extracting frontend build..."
docker rm -f financical_front_builder_tmp 2>/dev/null || true
docker create --name financical_front_builder_tmp financical_front_builder >/dev/null
docker cp financical_front_builder_tmp:/app/dist/. "$FRONTEND_DIR/"
docker rm -f financical_front_builder_tmp >/dev/null

echo "Installing nginx config..."
sudo cp "$NGINX_SOURCE" "$NGINX_AVAILABLE"
sudo ln -sfn "$NGINX_AVAILABLE" "$NGINX_ENABLED"

echo "Setting permissions..."
sudo chown -R www-data:www-data "$FRONTEND_DIR"
sudo chmod -R 755 "$FRONTEND_DIR"

echo "Testing nginx config..."
sudo nginx -t

echo "Reloading nginx..."
sudo systemctl reload nginx

echo "=== Deployment complete! ==="