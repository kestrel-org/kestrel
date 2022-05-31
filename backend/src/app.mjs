/**
 * Module dependencies.
 */

import express from 'express';
import routes from './routes/routes';
import {compose} from 'compose-middleware';
import asyncForEach from './utils/asyncForEach';

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

await asyncForEach(Object.entries(back_config),async ([extension,used])=>{
  if(used){
    const ext = await import(`./configs/${extension}/${extension}`)
    const extModule = ext.default(app)
    return extModule
  }
})

const routesOptions = [];
await asyncForEach(Object.entries(middlewares),async ([middleware,used])=>{
  if(used){
    const middlewareModule = await import(`./configs/${middleware}/${middleware}`)
    return routesOptions[middleware]=middlewareModule.default()
  }
})

await asyncForEach(routes,async (route)=>{
  const middlewares = [];
  for(let routeOption in routesOptions){
    if(route[routeOption]){
      middlewares.push(routesOptions[routeOption]);
    }
  }
  const router = await import(`./routes/${route.router}`);
  app.use(process.env.API_BASE_PATH + "/" + route.path, compose(middlewares), router.default);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({
    code: 404,
    error: "Route not found"
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

export default app
