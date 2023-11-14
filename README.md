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

   git clone https://github.com/ваше-имя-пользователя/ваш-проект.git
   cd ваш-проект

# Запуск приложения

Для запуска приложения выполните следующие шаги:

1. **Сборка и запуск Docker-контейнеров:**

    docker-compose -f dev-config/docker-compose.yml up --build

    Эта команда соберет и запустит контейнеры, описанные в файле `docker-compose.yml`.

2. **Открытие приложения Next.js:**

    Откройте ваш браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000), чтобы просмотреть приложение Next.js.

3. **Доступ к базе данных MySQL:**

    Вы можете подключиться к базе данных MySQL, используя MySQL-клиент. Используйте следующие данные для подключения:

    - **Хост:** mysql
    - **Порт:** 8101:3306
    - **Имя пользователя:** root
    - **Пароль:** root
    - **База данных:** users

   Эти данные позволят вам взаимодействовать с базой данных MySQL, которая запущена в контейнере.

---

Примечание: Перед запуском убедитесь, что у вас установлен Docker и Docker Compose. Вы можете установить их, следуя инструкциям на официальном сайте Docker.

