const config = {
    def: {
        swaggerDefinition: {
            info: {
                description: process.env.API_DESCRIPTION,
                title: process.env.API_TITLE,
                version: process.env.API_VERSION,
            },
            host: process.env.API_HOST + ':' + process.env.API_PORT,
            basePath: process.env.API_BASE_PATH,
            produces: [
                "application/json"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                Bearer: {
                    description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
            security: [{
                Bearer: []
            }],
            defaultSecurity: 'Bearer'
        },
        basedir: __dirname, //app absolute path
        files: ['../routes/**/*.js'] //Path to the API handle folder
    }
}

module.exports = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);
    expressSwagger(config.def)
}