const path = require("path");
const rfs = require('rotating-file-stream');
const logger = require('morgan');
const config = require('./config')

module.exports = (app) => {
    // create a rotating write stream
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../logs')
    });

    app.use(logger('combined', { stream: accessLogStream }));
}

