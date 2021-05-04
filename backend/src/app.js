/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const helmet = require('helmet');
const path = require("path");
const fs = require("fs");
const cors = require('cors');
const request = require('request');
require('dotenv').config();

const exempleRouter = require('./routes/exemple');

const app = express();

// Swagger
const expressSwagger = require('express-swagger-generator')(app);

const options = {
  swaggerDefinition: {
    info: {
      description: process.env.API_DESCRIPTION,
      title: process.env.API_TITLE,
      version: process.env.API_VERSION,
    },
    host: process.env.API_HOST + ':' + process.env.API_PORT,
    basePath: process.env.API_BASE_PATH,
    produces: [
      "application/json"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{
      Bearer: []
    }],
    defaultSecurity: 'Bearer'
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

/**
 * * Uncomment if you want to use a JWT check Server
 */
// const jwtCheck = async (req, res, next) => {
//   if (req.method == 'OPTIONS') {
//       next();
//   } else {
//       const token_id = req.headers.authorization;

//       const body = '{"token_id": "' + token_id + '", "client": "' + process.env.JWT_CLIENT_NAME + '" }';

//       options = {
//           ca: fs.readFileSync(__dirname + '/../../tmp/xxxx.ca', 'utf8'),
//           method: 'POST',
//           url: process.env.JWT_AUTHORIZATION_SERVER_URL + '/api/tokens',
//           headers: {
//               'content-type': 'application/json'
//           },
//           body: body
//       };

//       new Promise(
//           resolve => {
//               request(options, function (error, response, body) {
//                   if (error) {
//                       res.status(401).send({
//                           code: 401,
//                           error: error
//                       });
//                       resolve();
//                   } else {
//                       const data = JSON.parse(body);
//                       resolve(data);
//                   }
//               });
//           }
//       ).then(
//           data => {
//               if (data.is_good) {
//                   next();
//               } else {
//                   res.status(401).send({
//                       code: 401,
//                       error: data.error
//                   });
//               }
//           }
//       );
//   }
// }

app.use(session({
  secret: 'HvD56y!cgQnM',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    httpOnly: false,
    secure: false // true only for https
  }
}));

// Cors

/**
 * * Comment if you don't want to use CORS
 */
const whitelist = ['http://localhost:4200'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {
  flags: 'a'
})
app.use(logger('combined', {
  stream: accessLogStream
}))

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(helmet());


/**
 * * Comment if you want to use a JWT check Server
 */
app.use(process.env.API_BASE_PATH + '/exemple', exempleRouter);

/**
 * * Uncomment if you want to use a JWT check Server
 */
//app.use(process.env.API_BASE_PATH + '/exemple', jwtCheck, exempleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({
    code: 404,
    error: 'route not found'
  })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(res.locals.message);
});

module.exports = app;