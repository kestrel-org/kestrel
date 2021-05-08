const routes = require('../routes/routes');
const config = {
    
}
module.exports = (app) => {
    const checkToken = async (req, res, next) => {
        if (req.method == 'OPTIONS') {
            next();
        } else {
            const token_id = req.headers.authorization;

            const body = '{"token_id": "' + token_id + '", "client": "' + process.env.JWT_CLIENT_NAME + '" }';

            options = {
                ca: fs.readFileSync(__dirname + '/../../tmp/xxxx.ca', 'utf8'),
                method: 'POST',
                url: process.env.JWT_AUTHORIZATION_SERVER_URL + '/api/tokens',
                headers: {
                    'content-type': 'application/json'
                },
                body: body
            };

            new Promise(
                resolve => {
                    request(options, function (error, response, body) {
                        if (error) {
                            res.status(401).send({
                                code: 401,
                                error: error
                            });
                            resolve();
                        } else {
                            const data = JSON.parse(body);
                            resolve(data);
                        }
                    });
                }
            ).then(
                data => {
                    if (data.is_good) {
                        next();
                    } else {
                        res.status(401).send({
                            code: 401,
                            error: data.error
                        });
                    }
                }
            );
        }
    }
    for(let route of routes){
        if(route.checkToken){
            app.use(process.env.API_BASE_PATH + "/" + route.path, checkToken, require(`../routes/${route.router}`));
        }
    }
   
}