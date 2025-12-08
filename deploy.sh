#!/bin/bash

# Скрипт деплоя
set -e

echo "=== Deploying Financical ==="

# 1. Останавливаем текущие контейнеры
echo "Stopping existing containers..."
docker compose down

# 2. Собираем и запускаем бэкенд и БД
echo "Starting backend and database..."
docker compose up -d pgdb back

# 3. Ждем готовности бэкенда
echo "Waiting for backend to be ready..."
sleep 10

# 4. Собираем фронтенд
echo "Building frontend..."
docker compose run --rm front_builder

# 5. Копируем собранный фронтенд на сервер
echo "Copying frontend build to server..."
FRONTEND_DIR="/var/www/financical"
sudo mkdir -p $FRONTEND_DIR

# Извлекаем файлы из контейнера
CONTAINER_ID=$(docker create financical_front_builder)
docker cp $CONTAINER_ID:/app/dist/. $FRONTEND_DIR/
docker rm $CONTAINER_ID

# 6. Настраиваем права
echo "Setting permissions..."
sudo chown -R www-data:www-data $FRONTEND_DIR
sudo chmod -R 755 $FRONTEND_DIR

# 7. Перезагружаем nginx
echo "Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "=== Deployment complete! ==="