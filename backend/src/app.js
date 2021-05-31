/**
 * Module dependencies.
 */
const express = require('express');
const routes = require('./routes/routes');
const path = require("path");
const compose = require('compose-middleware').compose
require('dotenv').config();

const app = express();

// Don't change the order
const back_config = {
  helmet: true,
  swagger: true,
  session: true,
  cors: true,
  logger: true,
}

const middlewares = {
  checkToken: false,
  checkAuthenticated: false
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

for (let extension in back_config) {
    require(`./configs/${extension}`)(app);
}

const routesOptions = [];
for (let middleware in middlewares) {
    routesOptions[middleware] = require(`./configs/${middleware}`);
}

for (let route of routes) {
  const middlewares = [];
  for(let routeOption in routesOptions){
    if(route[routeOption]){
      middlewares.push(routesOptions[routeOption]);
    }
  }
  app.use(process.env.API_BASE_PATH + "/" + route.path, compose(middlewares), require(`./routes/${route.router}`));
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
