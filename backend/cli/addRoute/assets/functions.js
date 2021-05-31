const database = require(__dirname + '/../../../src/models/index');
const fs = require('fs');

// Returns a particular sequelize model as a usable object

function getSequelizeModel(model) {
    return database.sequelize.models[model];
}

// Returns all the available models in the project

function getAllModels() {
    let models = [];
    for(let model in database.sequelize.models){
        models.push({
            title: model.charAt(0).toUpperCase() + model.slice(1),
            value: model
        });
    }
    return models;
}

// Returns questions to prompt the user with

function getPrompts(router_name, models) {
    let questions = [{
            type: 'toggle',
            name: 'checkToken',
            message: 'Token verification support ?',
            initial: false,
            active: 'yes',
            inactive: 'no'
        },
        {
            type: 'toggle',
            name: 'checkAuthenticated',
            message: 'Check if the user is authenticated ?',
            initial: false,
            active: 'yes',
            inactive: 'no'
        },
        {
            type: 'text',
            name: 'path',
            initial: router_name.split('/').pop(),
            message: `Path ?`
        },
        {
            type: 'select',
            name: 'model',
            message: 'Use a model ?',
            choices: models,
            initial: 0
        }
    ];
    return questions;
}

// Returns a completed template to create the router

function buildTemplate(data, model, path, path_to_model) {

    // Build exemple template with no model used

    let result = data;
    result = result.replace(/{{path_to_model}}/g, path_to_model);
    result = result.replace(/{{path}}/g, path);

    // Build the crud template if a model is selected

    if (model) {
        const model_obj = getSequelizeModel(model);
        let attrs = model_obj['tableAttributes'];
        let properties = [];
        let swagger_types = ["string", "integer"]
        for (let attr_name in attrs) {
            let type = `${attrs[attr_name].type}`.toLowerCase();
            if (!swagger_types.includes(type)) {
                type = 'string'
            }
            properties.push(
                `* @property {${type}} ${attrs[attr_name].fieldName}.required`
            )
        }
        let model_def = model.charAt(model.length - 1) == "s" ? model.slice(0, -1) : model;
        model_def = model_def.charAt(0).toUpperCase() + model_def.slice(1);
        result = result.replace(/{{model}}/g, model);
        result = result.replace(/{{model_def}}/g, model_def);
        result = result.replace(/{{model_single}}/g, model.charAt(model.length - 1) == "s" ? model.slice(0, -1) : model);
        result = result.replace(/{{model_id}}/g, model_obj['primaryKeyAttribute']);
        result = result.replace(/{{model_properties}}/g, properties.join('\n '));

    }
    return result;
}

// Build folder path if it does not exist

function buildPath(router_path) {
    let path_to_model = "../models";
    if (router_path.length > 1) {
        path_to_model = "../".repeat(router_path.length - 1) + path_to_model;
        let folders = router_path[0];
        for (let i = 1; i < router_path.length; i++) {
            if (!fs.existsSync(`${__dirname}/../../../src/routes/${folders}`)) {
                fs.mkdirSync(`${__dirname}/../../../src/routes/${folders}`, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
            folders += `/${router_path[i]}`
        }
    }
    return path_to_model;
}

// Check if router is present in the routes.js file and returns the new routes

function checkForRouter(routes,{checkToken, checkAuthenticated, path}, router_name) {
    let found = false;
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].router == router_name) {
            found = true;
            routes[i] = {
                checkToken: checkToken,
                checkAuthenticated: checkAuthenticated,
                path: path,
                router: router_name
            }
        }
    }
    if (!found) {
        routes.push({
            checkToken: checkToken,
            checkAuthenticated: checkAuthenticated,
            path: path,
            router: router_name
        })
    }
    return {
        routes_alt : routes,
        found
    }
}

// Exit process when user cancel a prompt

function cancelProcess(){
    process.exit(0);
}

module.exports = {
    getAllModels,
    getSequelizeModel,
    getPrompts,
    buildTemplate,
    buildPath,
    checkForRouter,
    cancelProcess
}