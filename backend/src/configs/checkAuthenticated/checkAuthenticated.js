module.exports = async (req, res, next) => {
    const config = require('./config.json');

    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send({
            code: 401,
            error: "Authentication required"
        });
    }
}