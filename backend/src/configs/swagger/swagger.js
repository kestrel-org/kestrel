module.exports = (app) => {
    const config = require('./config');

    const swaggerUi = require('swagger-ui-express');
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerSpec = swaggerJSDoc(config);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

