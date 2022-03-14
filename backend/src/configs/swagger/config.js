module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0', 
        components: {},
        info: {
            description: process.env.API_DESCRIPTION,
            title: process.env.API_TITLE,
            version: process.env.API_VERSION,
        },
        host: process.env.API_HOST + ':' + process.env.API_PORT,
        servers: [{ url: '/api' }],
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
    apis: [`${__dirname}/../../routes/**/*.js`] //Path to the API handle folder
}