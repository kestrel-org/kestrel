const routes = require('../routes/routes');
const config = {

}

const checkAuthenticated = async (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send({
            code: 401,
            error: "Authentication required"
        });
    }
}

module.exports = checkAuthenticated;