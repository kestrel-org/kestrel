#!/usr/bin/env node

const args = process.argv.slice(2);
const prompts = require('prompts');
const { cancelProcess } = require('./assets/functions');
const addRoute = require('./assets/core');

(async () => {

    // Check if there is one and only one argument passed to the script

    let router_name;

    if (args.length != 1) {
        router_name = await prompts({
            type: 'text',
            name: 'value',
            initial: 'exemple',
            message: `The name of the router ?`
        }, {
            onCancel: cancelProcess
        });
        router_name = router_name.value;
    } else {
        router_name = args[0];
    }

    addRoute(router_name);

})();