module.exports = (app) => {
    const config = require('./config');

    const expressSwagger = require('express-swagger-generator')(app);
    expressSwagger(config.def)
}

