# Evaluation BDD - postgreSQL - Titanic dataset
The repository is based from a template of our professor @decima

The Project is about learning how to use database using a predefined dataset, here about the titanic

## Requirements
- NodeJS
- Docker with Docker-compose

## Getting started

### Installation
make a copy of `.env.sample` and name it `.env`.
ask me for the connexion url to the database !

This file is by default configured to run with the docker-compose or local redis installation.

Then run `yarn` or `npm install` depending on your environment.

### Start PostgreSQL with Docker

Start Postgresql server using `docker-compose up -d`. PostgreSQL port is `5432` and mongo express `8081`.

### Usage

Every step of the project is in the exercices folder

createTable.js function is to create the tables in the db
createRelation.js function is to create the relation of the tables
insert.js function is to insert all the data from titanicFull.csv in the db

The questions are separated in 3 files, questionsPart1, questionsPart2 and questionsPart3, with 5 questions in each.

To run them just run the following command :

```
npm run start file_name
```

If you have `yarn` you can run
```
yarn start ex0
```
It will automatically use the file `./exercices/file_name.js`.


The project subject can be found here :  [course.larget.fr](https://decima.notion.site/Mini-projet-SGBD-0622e1c8648c4973a596cd41c78354e2)

---

Thank you for your lecture :)
