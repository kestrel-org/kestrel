const config = require('./config')

module.exports = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);
    expressSwagger(config.def)
}

