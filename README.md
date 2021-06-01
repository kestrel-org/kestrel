# Template for Angular v11 - Node / Express / Sequelize

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

[![Depfu](https://badges.depfu.com/badges/a89d2322e30be2ad63350af5f0da8885/status.svg)](https://depfu.com) [![Depfu](https://badges.depfu.com/badges/a89d2322e30be2ad63350af5f0da8885/overview.svg)](https://depfu.com/github/template-angular-node/template-angular-node?project_id=26257)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

https://template-angular-node.github.io/

## Getting started

This template aims to give a solid structure to create a project based on **Angular** for the *Frontend* and **Node / Express et Sequelize** for the *backend*.

Several utilities are built in the template :

* A bash script to initialize the database and automatically creates models
* A bash script to create the folder *dist* for production purposes
* A bash script to install dependencies for the *Frontend* and the *Backend*
* A customizable class named *PDFGenerator*
* Encryption functions to encrypt and decrypt strings with a AES - 256 protocol
* Optional use of Faker to populate the database with fake data
* An Angular directive to handle preloaders
* Integration of Swagger for the backend
* Integration of Compodoc for the frontend
* Optional use of an auhtorization server


### Requirements

* Node.js installed
* nodemon installed
* Any kind of SGBD installed

### Setup

1. Fork the git repository
2. Git clone your fork locally
3. Install dependencies with the script located in ***utils/installDependencies.sh***
4. Configure database access in ***backend/.env*** for Developpement, Test and Production environnements
5. You can modify the environnement variables in this file to fit your needs
6. To create and populate the exemple database use the script located in ***utils/initDB.sh***

## Running the app

After the setup / the configuration done, you can start the backend and the frontend by running the following command in their respective directories

```sh
$ npm start
```

By default you can acces the backend on <http://localhost:4000/> and the frontend on <http://localhost:4200/>

The api documentation can be accessed on <http://localhost:4000/api-docs/>

## Add a route in the backend

Use `npm run addRoute <ROUTE>` in the *backend* directory

## Configuration

### General

* You can select the modules and middlewares you want to use in the *backend* in the ***app.js*** file by changing values for the **back_config** and **middlewares** objects

* If you desire to change their configuration you can do so in the **configs** folder

### Routes

Routes configuration are located in ***routes.js***

## Developed with

* [Visual Studio Code](https://code.visualstudio.com/) - IDE
* [Angular v11](https://angular.io/) - Framework Javascript for Frontend development
* [Angular - Datatables](http://l-lin.github.io/angular-datatables/#/welcome) - Library offering advanced functions to use html tables (filters, search, pagination, ...)
* [Ngx-sweetalert2](https://www.npmjs.com/package/@sweetalert2/ngx-sweetalert2) - Library use to generate easy to use and customizable js popup boxes
* [Compodoc](https://compodoc.app/) - Documentation tool for Angular
* [NodeJS](https://nodejs.org/en/) - Javascript for server purposes
* [Express](https://expressjs.com/fr/) - NodeJS Framework designed for apis
* [Sequelize](https://sequelize.org/) - ORM based on NodeJS promises
* [Jest](https://jestjs.io/) - Test Framework for Javascript
* [Supertest](https://www.npmjs.com/package/supertest) - Api test framework for Javascript
* [Swagger](https://swagger.io/) - Api documentation tool

## Versions

* 1.5.0 - Add Helmet config for the backend - `25/05/2021`

* 1.4.1 - Fix CheckToken - `18/05/2021`

* 1.4.0 - Automatic dependencies update - `17/05/2021`

* 1.3.0 - Backend Upgrade - `17/05/2021`

* 1.2.0 - Backend refactorization - `08/05/2021`

* 1.1.0 - Exemples - `04/05/2021`

* 1.0.0 - Initialization - `27/04/2021`

See [CHANGELOG.md](CHANGELOG.md) for more informations

## Bash Scripts 

### ORM - Initialize database (in the root folder)

```sh
$ ./utils/initDB.sh
```

### DEV - Install app dependencies (in the root folder)

```sh
$ ./utils/installDependencies.sh
```

### PROD - Building the app (in the root folder)

```sh
$ ./utils/buildForProd.sh
```

## Sequelize Commands - ORM (in the backend folder)

```sh
$  npm run generate-models                             Auto generate models
$  npx sequelize-cli db:migrate                        Run pending migrations
$  npx sequelize-cli db:migrate:schema:timestamps:add  Update migration table to have timestamps
$  npx sequelize-cli db:migrate:status                 List the status of all migrations
$  npx sequelize-cli db:migrate:undo                   Reverts a migration
$  npx sequelize-cli db:migrate:undo:all               Revert all migrations ran
$  npx sequelize-cli db:seed                           Run specified seeder
$  npx sequelize-cli db:seed:undo                      Deletes data from the database
$  npx sequelize-cli db:seed:all                       Run every seeder
$  npx sequelize-cli db:seed:undo:all                  Deletes data from the database
$  npx sequelize-cli db:create                         Create database specified by configuration
$  npx sequelize-cli db:drop                           Drop database specified by configuration
$  npx sequelize-cli init                              Initializes project
$  npx sequelize-cli init:config                       Initializes configuration
$  npx sequelize-cli init:migrations                   Initializes migrations
$  npx sequelize-cli init:models                       Initializes models
$  npx sequelize-cli init:seeders                      Initializes seeders
$  npx sequelize-cli migration:generate                Generates a new migration file       [aliases: migration:create]
$  npx sequelize-cli model:generate                    Generates a model and its migration  [aliases: model:create]
$  npx sequelize-cli seed:generate                     Generates a new seed file            [aliases: seed:create]
```

## Author(s)

* **Florent SIMONET** _alias_ [@SFlorent](https://github.com/SFlorent)
* **Sébastien FOUCHEUR** _alias_ [@Sfoucheur](https://github.com/Sfoucheur)

## Licence

This project is under ``MIT License`` - see [LICENSE.md](LICENSE.md) for more informations

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
