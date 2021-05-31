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
module.exports = (app) => {
    app.use(helmet(config.HELMET_OPTIONS));
}