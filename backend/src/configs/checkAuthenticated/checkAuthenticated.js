const routes = require('../../routes/routes');
const config = require('./config.json')

module.exports = async (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send({
            code: 401,
            error: "Authentication required"
        });
    }
}