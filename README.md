# News Hub

## Description
This project demonstrate a simple NEWS hub feature which was given as a SSE technical test at Codification using [News API](https://newsapi.org/). (Backend only). 

This project is a simple application of [News API]() for searching and retrieving live articles from all over the web. The News hub project allows users to search articles through diffrent filter criterias and import necessary articles. Users can later retrieve the imported articles via "Favourites" tab and display a detailed view of the article.

Main features implemented are;

- Article discovery and analysis using [Everything](https://newsapi.org/docs/endpoints/everything) endpoint.
- Retrieve live top and breaking headlines using [Top-Headlines](https://newsapi.org/docs/endpoints/top-headlines) endpoint.
- Retrieve publishers available on the API using [Sources](https://newsapi.org/docs/endpoints/sources) endpoint.

## Technologies and Services
Technologies
- [NodeJS](https://nodejs.org/) -  A platform built on Chrome's JS runtime for easily building fast, scalable network apps.
- [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript, gives better tooling at any scale.
- [NestJS](https://github.com/nestjs/nest) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/) -  An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- [ExpressJS](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](http://www.mongodb.org/) - The only database that harnesses the innovations of NoSQL.

Services
- [News API](https://newsapi.org/) - News API is a simple HTTP REST API for searching and retrieving live articles from all over the web.

## Requirements 
- Node version 16.13.2
- NPM version 8.1.2
- Mongo version 5.0.6
- NestJS version 8.2.1

## Pre-Requisites and setup
- An API key from [News API](https://newsapi.org/account).
- Install [Node.js](https://nodejs.org/) to your local workstation.
- Use [NPM](https://www.npmjs.com/) to manage dependencies.
- Use [Environment Variables]() to manage configuration inside your application. Edit the `.env.stage.dev` file accordingly.
- News Hub frontend can be found from [here](https://github.com/devni-heraliyawala/news-hub-frontend).
- News API backend can be found from [here](https://github.com/devni-heraliyawala/news-hub-backend).
- Default port of `3000` is used for the backend.
- Default port of `3001` is used for the frontend.
- NodeJS backend should be updated, configured and run successfully to start the frontend properly.

## Installation
1. Clone the repo and install the dependencies.
```bash
$ git clone https://github.com/devni-heraliyawala/news-hub-backend.git
$ cd news-hub-backend

```
2. Install the dependencies
```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

