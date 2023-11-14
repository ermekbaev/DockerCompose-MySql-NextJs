# DockerCompose-MySql-NextJs
# Мой Проект

Этот проект демонстрирует, как настроить Docker Compose для приложения Next.js и базы данных MySQL.

## Предварительные требования

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Структура проекта

- `dev-config`: Содержит Dockerfile и конфигурацию Docker Compose.
  - `Dockerfile.mysql`: Dockerfile для MySQL.
  - `Dockerfile.user`: Dockerfile для Next.js.
  - `docker-compose.yml`: Конфигурация Docker Compose.

- `mysql`: Директория для хранения данных MySQL.

- `user`: Код приложения Next.js.

## Запуск проекта

1. Клонируйте этот репозиторий:

   ```bash
   git clone https://github.com/ваше-имя-пользователя/ваш-проект.git
   cd ваш-проект
