const chalk = require('chalk');
const prompts = require('prompts');
const fs = require('fs');
const util = require('util');
const {
    getAllModels,
    getPrompts,
    buildTemplate,
    buildPath,
    checkForRouter,
    cancelProcess
} = require('./functions');

async function addRoute(router_name) {

    const pattern = /^([-_A-z]+\/)*[-_A-z]+$/g
    const is_file_path = pattern.test(router_name);

    // Check if argument length is 2 or more and if it contains only letters and '-' and '_'

    if (!is_file_path || router_name.length < 2) {
        console.error(chalk.red.bold("La nom doit contenir au moins 2 caractère\nLes caractères autorisés sont : \n· A-Z \n· - \n· _\n· /"));
        return;
    }

    // All paths to needed files such as the template for the routers

    const routes = require('../../../src/routes/routes');
    const router_file_path = `${__dirname}/../../../src/routes/${router_name}.js`;
    const router_sample_data = `${__dirname}/templates/routerExample.txt`;
    const router_crud_data = `${__dirname}/templates/routerCRUD.txt`;
    const routes_path = `${__dirname}/../../../src/routes/routes.js`;

    // Get all models to prompt the user with them

    let models = [{
        title: "Aucun",
        value: false
    }]

    models = models.concat(getAllModels());

    // Check if router already exist

    let overwrite = true;
    if (fs.existsSync(router_file_path)) {
        const ow = await prompts({
            type: 'toggle',
            name: 'value',
            message: 'Already exist, Overwrite ?',
            initial: false,
            active: 'yes',
            inactive: 'no'
        }, {
            onCancel: cancelProcess
        });
        overwrite = ow.value;
    }

    if (overwrite) {

        // Prompt user with different questions to build the router

        const responses = {
            checkToken,
            checkAuthenticated,
            path,
            model
        } = await prompts(getPrompts(router_name, models), {
            onCancel: cancelProcess
        });

        // Build folder path if it does not exist

        const router_path = router_name.split('/');

        const path_to_model = buildPath(router_path);

        // Create an empty router file

        fs.writeFile(router_file_path, "", function (err) {
            if (err) {
                return console.log(err);
            }
            let data = router_sample_data;
            let result = "";
            if (model) {
                data = router_crud_data;
            }

            //  Read the right template file if the user has selected a model or not

            fs.readFile(data, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                // Build template according to responses

                result = buildTemplate(data, model, path, path_to_model);

                // Save the template to the router file

                fs.writeFile(router_file_path, result, (err) => {
                    if (err) {
                        return console.log(err);
                    }

                    // Check if router exist

                    const {
                        routes_alt,
                        found
                    } = checkForRouter(routes, responses, router_name);

                    // Write the config of the router to routes.js file

                    fs.writeFile(routes_path, "module.exports = " + util.inspect(routes_alt), function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log(chalk.blue.bold(`Router ${found ? "updated" : "created"} : `) + chalk.white.bold(`${router_name}.js`));
                    });
                });
            });

        });
    }

}
module.exports = addRoute