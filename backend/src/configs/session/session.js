const session = require('express-session');
const config = require('./config')

module.exports = (app) => {
    app.use(session({
        secret: 'HvD56y!cgQnM',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            httpOnly: false,
            secure: false // true only for https
        }
    }));
}