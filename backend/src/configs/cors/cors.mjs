import cors from 'cors'
import config from './config.mjs';

export default (app) => {

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
