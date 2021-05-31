const fs = require('fs');
const got = require('got');
const config = {

}

const checkToken = async (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const token_id = req.headers.authorization;

        const body = '{"token_id": "' + token_id + '", "client": "' + process.env.JWT_CLIENT_NAME + '" }';

        const url = process.env.JWT_AUTHORIZATION_SERVER_URL + '/api/tokens';

        const options = {
            https: {
                certificateAuthority: fs.readFileSync(__dirname + '/../../../tmp/xxxx.ca', 'utf8')
            },
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: body
        };

        try {
            const response = await got.post(url, options);
            const data = JSON.parse(response.body);

            if (data.is_good) {
                next();
            } else {
                res.status(401).send({
                    code: 401,
                    error: data.error
                });
            }

        } catch (error) {
            res.status(401).send({
                code: 401,
                error: error
            });
        }
    }
}


module.exports = checkToken;