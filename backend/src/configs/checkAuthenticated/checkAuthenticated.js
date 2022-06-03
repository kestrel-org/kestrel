import config from './config'
export default async (req, res, next) => {

    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send({
            code: 401,
            error: "Authentication required"
        });
    }
}