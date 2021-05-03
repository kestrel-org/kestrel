# Template pour Angular v11 - Node / Express / Sequelize

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Pour commencer

Ce template a pour but de fournir une base solide dans la réalisation d'un projet avec **Angular** pour le *Frontend* et **Node / Express et Sequelize** pour le *backend*.

Plusieurs utilitaires ont été intégré au template, comme par exemple :

* Un script bash pour initialiser la base de donnée et créer automatiquement les modèles
* Un script bash pour la création d'un *dist* déstiné à la mise en production
* Un script bash permettant d'installer les dépendances du *Frontend* et du *Backend*
* Une classe PDFGenerator personnalisable
* Des fonctions de crypto permettant de chiffrer et de déchiffrer une chaîne de caractères avec un protocole AES - 256
* La possibilité d'utiliser Faker pour remplir la base de données avec des données factices
* Une directive Angular facilitant la gestion des preloaders
* Une intégration de Swagger pour le backend
* Une intégration de Compodoc pour le frontend
* La possibilité d'utiliser un serveur d'autorisation
* Etc ...

### Prérequis

* Avoir Node.js installé
* Avoir nodemon installé
* Avoir un SGBD installé

### Installation

1. Fork le répertoire git
2. Descendre votre copie du répertoire sur votre machine
3. Installer les dépendances avec le script se situant dans ***utils/installDependencies.sh***
4. Configurer les accès à la base de données dans ***backend/dbconfig.json***
5. Pour la génération automatique des modèles il faut aussi modifié la commande dans ***backend/package.json***
6. Vous pouvez regarder et modifier les différentes variables d'environnement situé dans ***backend/.env***

## Démarrage

Une fois l'installation / la configuration effectués, vous pouvez lancer le backend et le frontend en lançant la commande suivante dans leurs dossiers respectifs

```sh
$ npm start
```

Par défault l'accès au backend se fait sur l'url <http://localhost:4000/> et le frontend sur l'url <http://localhost:4200/>

## Fabriqué avec

* [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de code
* [Angular v11](https://angular.io/) - Framework Javascript pour le Frontend
* [Compodoc](https://compodoc.app/) - Outil de documentation pour Angular
* [NodeJS](https://nodejs.org/en/) - Javascript orienté Serveur
* [Express](https://expressjs.com/fr/) - Framework NodeJS pour la construction d'Api
* [Sequelize](https://sequelize.org/) - ORM basé sur les promesses NodeJS
* [Jest](https://jestjs.io/) - Framework de test pour Javascript
* [Supertest](https://www.npmjs.com/package/supertest) - Framework de test d'Api pour Javascript
* [Swagger](https://swagger.io/) - Outil de documentation d'Api

## Versions

* 1.0 - Initialisation du Projet

Voir le fichier [CHANGELOG.md](CHANGELOG.md) pour plus d'informations

## Scripts Bash

### ORM - Pour initialiser la base de donnée (dans le dossier racine)

```sh
$ ./utils/initDB.sh
```

### DEV - Pour installer les dépendances de l'application (dans le dossier racine)

```sh
$ ./utils/installDependencies.sh
```

### PROD - Pour build l'application (dans le dossier racine)

```sh
$ ./utils/buildForProd.sh
```

## Commandes Sequelize - ORM (dans le dossier backend)

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

## Auteur(s)

* **Florent SIMONET** _alias_ [@SFlorent](https://github.com/SFlorent)

## Licence

Ce projet est sous licence ``MIT License`` - voir le fichier [LICENSE.md](LICENSE.md) pour plus d'informations

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
