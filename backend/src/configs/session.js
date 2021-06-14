const session = require('express-session');
const config = {

}
module.exports = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            httpOnly: false,
            secure: false // true only for https
        }
    }));
}