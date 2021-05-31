const routes = require('../routes/routes');
const config = {

}
module.exports = (app) => {
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

    // for (let route of routes) {
    //     if (route.checkToken) {
    //         app.use(process.env.API_BASE_PATH + "/" + route.path, checkAuthenticated, require(`../routes/${route.router}`));
    //     }
    // }

}