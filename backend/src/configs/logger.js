const path = require("path");
const fs = require("fs");
const logger = require('morgan');
const config = {

}
module.exports = (app) => {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), {
        flags: 'a'
    })
    app.use(logger('combined', {
        stream: accessLogStream
    }))
}