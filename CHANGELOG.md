# Changelog

## v1.6.0 - Tests - `NONE`

* Modification du stockage des logs (maintenant 1 fichier par jour)
* TODO Tests
* Ajout d'un loader dans les scripts bash
* Ajout du dialect dans le fichier .env

## v1.5.0 - Ajout de la config Helmet pour le backend - `25/05/2021`

* Ajout de la config Helmet pour le backend
* Modification de la "Content Security Policy" de Helmet afin d'avoir de nouveau accès a la documentation Swagger

## v1.4.1 - Fix CheckToken - `18/05/2021`

* Fix de CheckToken

## v1.4.0 - Mise à jour automatique des dépendances - `17/05/2021`

* Ajout de [Depfu](https://depfu.com/) pour la création de PRs automatiques liées aux mises à jour des dépendances
* Ajout de [Mergify](https://mergify.io/) pour merge automatiquement des PRs sur la branche principale
* Ajout d'un fichier de règles: ".mergify.yml" (merge uniquement les PRs de Depfu qui sont des mises à jour "PATCH")
* Mise à jour des dépendances
* Ajout de la possibilité de donner une hauteur et une largeur lors de l'utilisation de la "Loader Directive"
* Ajout du flag "--noInitModels" sur la commande "generate-models"
* Suppression du fichier "init-models.js"

## v1.3.0 - Améliorations diverse du backend - `17/05/2021`

* Renommage du dossier assets en templates
* Demande de saisie de nom si pas fourni dans la commande addRoute
* Support pour les routes avec dossiers

## v1.2.0 - Réécriture du backend - `08/05/2021`

* Ajout d'un script pour générer des routeurs automatiquement
* Ajout du fichier routes.js pour centraliser les routes
* Ajout d'un dossier configs
* Centralisation de la configuration dans le .env
* Fix du script buildForProd.sh
* Mise à jour des dépendances

## v1.1.0 - Exemples - `04/05/2021`

* Réécriture de la "Loader Directive"
* Ajout de [ngx-sweetalert2](https://www.npmjs.com/package/@sweetalert2/ngx-sweetalert2)
* Ajout de [Angular - Datatables](http://l-lin.github.io/angular-datatables/#/welcome)
* Ajout de la possibilité d'utiliser les requêtes Swagger avec le CORS
* Ajout d'exemples pour le backend et le frontend
* Mise à jour des dépendances

## v1.0.0 - Initialisation - `27/04/2021`

* Initialisation du projet
