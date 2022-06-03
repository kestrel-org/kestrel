import config from './config';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export default (app) => {
    const swaggerSpec = swaggerJSDoc(config);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

