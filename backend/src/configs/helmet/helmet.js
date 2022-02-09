module.exports = (app) => {
    const helmet = require('helmet');
    const config = require('./config');

    app.use(helmet(config.HELMET_OPTIONS));
}
