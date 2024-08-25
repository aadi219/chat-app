<h1 style="text-align: center;">Messenger</h1>

![Static Badge](https://img.shields.io/badge/status-in_development-green)
![Static Badge](https://img.shields.io/badge/active_branch-middleware-orange)
![Static Badge](https://img.shields.io/badge/language-typescript-blue)

## Project Description
The messenger application is designed to be a simple but thorough solution for instant messaging needs. Created using a modern stack (PERN), this project implements advanced full-stack concepts. This project was created for the purpose of familiarizing myself with the PERN stack and its related technologies by creating an end-to-end application implementing advanced concepts such as an MVC architure using Dependency Injection and more.

## Project Status
This project is in active development. The back-end of the application (middleware, actions and database) is currently being implemented with the front-end scoped to be implemented afterwards. Contributions, feedback and issues are encouraged.

## Setup
### Requirements
- `nodejs v18.19.0+`
- `npm v9.2.0+`

```bash
git clone https://github.com/aadi219/chat-app.git
```

```bash
cd chat-app
```
```bash
npm install
```
### Database Instance
This application uses a PostgreSQL database, managed locally using PGAdmin. Refer to the [PGAdmin](https://www.pgadmin.org/) or [PSQL](https://www.postgresql.org/docs/) documentations to set up a local database instance.

After installing PSQL on your system.
- Create a new user with a password or use an existing one
- Create a database instance
- Within that database, create a schema called `app`

### Database Connection
Connection to the local database is established by providing your private credentials in a `.env` file.

`touch .env` within the project root folder `chat-app/`.
The application requires the following environment variables to be set in the .env file.
```
DB_USER=<postgres_username>
DB_NAME=<database_name>
DB_HOST=<"localhost" or your_database_host>
DB_PORT=<postgres_port (5432 is default on localhost)>
DB_PASSWORD<user_password>
```

### Run App
Sync tables in database
```
npm run db:sync
```
Run App
```
npm run server
```


## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Important Packages:
- Sequelize `^6.37.3` - ORM to handle database transactions with Typescript and Express.
- Dotenv `^16.4.5` - Managing private/local environment variables
- Tsyringe `^4.8.0` & Reflect-Metadata `^0.2.2` - Used for implementing dependency injection.
- Express-Validator `^7.2.0` - Middleware data validation
- Nodemon `^3.1.4` - Monitor script for development
