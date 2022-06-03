import session from 'express-session';
import config from './config'

export default (app) => {
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
