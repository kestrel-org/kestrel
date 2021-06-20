module.exports = {
    HELMET_OPTIONS: {
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "script-src": "'self' 'unsafe-inline'"
            }
        }
    }
}