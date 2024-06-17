# Effective Mobile Typescript/Node.js Application

## Description

 User Service and User Action History Service

## Overview

This project consists of two microservices:
1. **User Service**: Manages user data.
2. **User Action History Service**: Logs and retrieves user actions.

The services communicate with each other via RABBITMQ to ensure that user creation and update events are recorded in the User Action History Service. Both services use PostgreSQL for data storage.

## Technology Stack

- **User Service**: JavaScript (Typescript) (Node JS)
- **User Action History Service**: Node.js
- **Database**: PostgreSQL
- **Message Broker**: RabbitMQ
- **Containerization**: Docker

## Running the app with Docker

This application can also be run using Docker. Make sure you have Docker and Docker Compose installed on your system. Then, you can use the following command to start the application:

```bash
$ docker-compose up
```
## Instaletion

Run following command for installing all the dependencies locally.

```bash
$ npm install
```

## Running the app on local environment
```bash
$ npm run start:dev
```

## Environment Variables
Put all the environment variables inside `.env` file located ats the root of the project. The list of all the environment variables is available in `.env.example` file. 



## Database Migrations
To deploy migratoin to database use the following command:

```
npm run migrate:run 
```

