module.exports = (app) => {
    const session = require('express-session');
    const config = require('./config');

    app.use(session({
        secret: 'HvD56y!cgQnM',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            httpOnly: false,
            secure: 'auto' // true only for https
        }
    }));
}
