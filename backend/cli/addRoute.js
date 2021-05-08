#!/usr/bin/env node

const args = process.argv.slice(2);
const chalk = require('chalk');

// Check if there is one and only one argument passed to the script
if (args.length != 1) {
    console.error(chalk.red.bold("Veuillez specifier un seul argument !"));
    return;
}
const router_name = args[0];
const pattern = /[^-_a-zA-Z]/g

// Check if argument length is 2 or more and if it contains only letters and '-' and '_'

if (router_name.match(pattern) || router_name.length < 2) {
    console.error(chalk.red.bold("La nom doit contenir au moins 2 caractère\nLes caractères autorisés sont : \n· A-Z \n· - \n· _"));
    return;
}
const routes = require('../src/routes/routes');
const Sequelize = require('Sequelize');
const prompts = require('prompts');
const fs = require('fs');
const path_mod = require('path');
const util = require('util');
const env = process.env.NODE_ENV || 'dev';
const config = require(__dirname + '/../dbconfig.js')[env];

// Get sequelize with config to get all models

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const router_file_path = `${__dirname}/../src/routes/${router_name}.js`;
const router_sample_data = `${__dirname}/assets/routerExample.txt`;
const router_crud_data = `${__dirname}/assets/routerTemplate.txt`;
const routes_path = `${__dirname}/../src/routes/routes.js`;
const ignored_files = ["index.js","init-models.js"];
const models = [{title:"Aucun",value:false}]

// Get all models to prompt the user with them

fs.readdirSync(`${__dirname}/../src/models`)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (!ignored_files.includes(file)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    file = file.split(".")[0];
    models.push({
        title : file,
        value : file
    });
  });

(async () => {

    // Check if router already exist

    let overwrite = true;
    let exist = false;
    if (fs.existsSync(router_file_path)) {
        exist = true;
        const ow = await prompts({
            type: 'toggle',
            name: 'value',
            message: 'Already exist, Overwrite ?',
            initial: false,
            active: 'oui',
            inactive: 'non'
        });
        overwrite=ow.value;
    }
    if(overwrite){
        // Prompt user with different paramters to build the router
        const checkToken = await prompts({
            type: 'toggle',
            name: 'value',
            message: 'Token verification support ?',
            initial: false,
            active: 'yes',
            inactive: 'no'
        });
        const path = await prompts({
            type: 'text',
            name: 'value',
            initial: router_name,
            message: `Path ?`
        });
        const model = await prompts({
            type: 'select',
            name: 'value',
            message: 'Use a model ?',
            choices: models,
            initial: 0
        });

        // Create an empty router file

        fs.writeFile(router_file_path, "",function (err) {
            if (err) {
                return console.log(err);
            }
            let data = router_sample_data;
            let result = "";
            if(model.value){
                data = router_crud_data;
            }

            //  Read the right template file if the user has selected a model or not

            fs.readFile(data, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                result = data;

                // Build the crud template if a model is selected

                if(model.value){
                    const model_obj = require(path_mod.join(__dirname+"/../src/models", `${model.value}.js`))(sequelize, Sequelize.DataTypes);
                    let attrs = model_obj['tableAttributes'];
                    let properties = [];
                    let swagger_types=["string","integer"]
                    for(let attr_name in attrs){
                        let type = `${attrs[attr_name].type}`.toLowerCase();
                        if(!swagger_types.includes(type)){
                            type = 'string'
                        }
                        properties.push(
                            `* @property {${type}} ${attrs[attr_name].fieldName}.required`
                        )
                    }
                    let model_def = model.value.charAt(model.value.length-1) == "s" ? model.value.slice(0, -1) : model.value;
                    model_def = model_def.charAt(0).toUpperCase() + model_def.slice(1);
                    result = data.replaceAll("{{model}}", model.value);
                    result = result.replaceAll("{{model_def}}", model_def);
                    result = result.replaceAll("{{model_single}}", model.value.charAt(model.value.length-1) == "s" ? model.value.slice(0, -1) : model.value);
                    result = result.replaceAll("{{model_id}}", model_obj['primaryKeyAttribute']);
                    result = result.replaceAll("{{model_properties}}", properties.join('\n '));
                    result = result.replaceAll("{{path}}", path.value);
                    
                }

                // Save the template to the router file

                fs.writeFile(router_file_path, result, (err) => {
                    if (err) {
                        return console.log(err);
                    }

                    // Check if router exist

                    if(exist){
                        let found = false;
                        for(let i = 0;i<routes.length;i++){
                            if(routes[i].router==router_name){
                                found=true;
                                routes[i]={
                                    checkToken: checkToken.value,
                                    path: path.value,
                                    router: router_name
                                }
                            }
                        }
                        if(!found){
                            routes.push({
                                checkToken: checkToken.value,
                                path: path.value,
                                router: router_name
                            })
                        }
                    }else{
                        routes.push({
                            checkToken: checkToken.value,
                            path: path.value,
                            router: router_name
                        })
                    }

                    // Write the config of the router to routes.js file

                    fs.writeFile(routes_path,"module.exports = "+util.inspect(routes) ,function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log(chalk.blue.bold(`Router ${exist ? "updated" : "created"} : `)+chalk.white.bold(`${router_name}.js`));
                    });
                });
            });
            
        });
    }
})();