'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import config from '../../dbconfig.js'
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'dev';

const conf = config[env]
const db = {};

const sequelize = new Sequelize(conf.database, conf.username, conf.password, conf);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.cjs');
  })
  .forEach(async (file) => {
    const modelModule = await import(url.pathToFileURL(path.join(__dirname, file)))
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
