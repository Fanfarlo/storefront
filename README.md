# Project Summary

This is a project to build the back-end of an online store. The requirements are giving by the client. Also We are going to be working with a partner to build the front-end so we need to share information to connect with the front-end. Our job is to create a dabatabase, secure important data, authenticate users, testing and rest api endpoints.

## Setup server

- Server is running on port: `3000`
- Install dependencies: `npm install`

## Create env file

- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront_dev
- POSTGRES_TEST_DB=storefront_test
- POSTGRES_USER=miguelo
- POSTGRES_PASSWORD=yourpassword
- ENV=dev 
- BCRYPT_PASSWORD=yourtring
- SALT_ROUNDS=10
- TOKEN_SECRET=yourstring

## Setup Postgres database with docker

- Get image: `docker pull postgres`
- Run container: `docker-compose up -d`
- Get image name: `docker ps -a`
- Connect to PSQL bash: `docker exec -it image-name psql -U username database-name`
- Migrate table: `db-migrate up`
- Delete table: `db-migrate down`
- Database ports: `5432:5432`

## Scripts

- Start build typescript: `npm run build`
- Start server: `npm run start`
- Start test: `npm run test`
- Start watch: `npm run watch`
- Start eslint: `npm run lint`
- Start format: `npm run prettier`
