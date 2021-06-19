const helmet = require('helmet');
const config = {
    HELMET_OPTIONS: {
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "script-src": "'self' 'unsafe-inline'"
            }
        }
    }
}
const core = (app) => {
    app.use(helmet(config.HELMET_OPTIONS));
}
module.exports = {
    config:config,
    default:core
}