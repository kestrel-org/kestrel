/**
 * Module dependencies.
 */
const express = require('express');
const routes = require('./routes/routes');
const path = require("path");
require('dotenv').config();

const app = express();

// Don't change the order
const back_config = {
  helmet: { active: true, routeOption: false },
  swagger: { active: true, routeOption: false },
  session: { active: true, routeOption: false },
  cors: { active: true, routeOption: false },
  logger: { active: true, routeOption: false },
  checkToken: { active: true, routeOption: true },
  checkAuthenticated: { active: true, routeOption: true },
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const routesOptions = [];
for (let extension in back_config) {
  if (back_config[extension].active) {
    if (back_config[extension].routeOption) {
      routesOptions[extension] = require(`./configs/${extension}`);
    } else {
      require(`./configs/${extension}`)(app);
    }
  }
}

console.log(routesOptions);

for (let route of routes) {
  if (!route.checkToken) {
    app.use(process.env.API_BASE_PATH + "/" + route.path, require(`./routes/${route.router}`));
  }
}

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
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  res.status(err.status || 500);
  res.send(res.locals.message);
});

module.exports = app;