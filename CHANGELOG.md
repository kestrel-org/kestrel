# Changelog


## v2.1.0 - Mailer and dependencies update - `09/14/2021`

* Added a mailer function in backend/utils
* Dependencies update

## v2.0.0 - Full Cli for the template and gitbook documentation - `06/25/2021`

* Added a full cli for the template
* Log storage changed (now 1 file per day)
* Adding the dialect and the session secret in the .env file
* Add checkAuthenticated config for the backend
* English translation
* Added gitbook for documentation
* Angular v12

## v1.5.0 - Add Helmet config for the backend - `05/25/2021`

* Add Helmet config for the backend
* Modification of the "Content Security Policy" of Helmet in order to have access to the Swagger documentation again

## v1.4.1 - Fix CheckToken - `18/05/2021`

* Fix of CheckToken

## v1.4.0 - Automatic dependencies update - `05/17/2021`

* Added [Depfu](https://depfu.com/) for the creation of automatic PRs linked to dependencies updates
* Added [Mergify](https://mergify.io/) to automatically merge PRs on the main branch
* Add a rules file: ".mergify.yml" (merge only Depfu PRs that are "PATCH" updates)
* Added the ability to give a height and width when using the "Loader Directive".
* Add "--noInitModels" flag on "generate-models" command
* Deleting the "init-models.js" file
* Dependencies update

## v1.3.0 - Backend Upgrade - `05/17/2021`

* Rename assets folder to templates
* Request to enter a name if not provided in the addRoute command
* Support for routes with folders

## v1.2.0 - Backend refactoring - `05/08/2021`

* Add a script to automatically generate routers
* Add routes.js file to centralize routes
* Addition of a configs folder
* Centralization of the configuration in the .env
* Fix buildForProd.sh script
* Dependencies update

## v1.1.0 - Examples - `05/04/2021`

* Refactor the "Loader Directive"
* Added [ngx-sweetalert2](https://www.npmjs.com/package/@sweetalert2/ngx-sweetalert2)
* Added [Angular - Datatables](http://l-lin.github.io/angular-datatables/#/welcome)
* Added the possibility to use Swagger queries with CORS
* Added examples for the backend and frontend
* Dependencies update

## v1.0.0 - Initialization - `04/27/2021`

* Project initialization
