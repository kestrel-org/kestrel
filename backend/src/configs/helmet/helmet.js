const helmet = require('helmet');
const config = require('./config')

module.exports = (app) => {
    app.use(helmet(config.HELMET_OPTIONS));
}
