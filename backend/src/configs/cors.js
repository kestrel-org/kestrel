const cors = require('cors');
const config = {
    whitelist: ['http://localhost:4200', 'http://localhost:4000']
}
module.exports = (app) => {
    const corsOptions = {
        credentials: true,
        origin: function (origin, callback) {
            if (config.whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    app.use(cors(corsOptions));
}