import path from 'path';
import rfs from 'rotating-file-stream';
import logger from 'morgan';
import * as url from 'url';
import config from './config';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default (app) => {

    // create a rotating write stream
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../logs')
    });

    app.use(logger('combined', { stream: accessLogStream }));
}

