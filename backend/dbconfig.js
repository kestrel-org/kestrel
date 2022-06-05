import 'dotenv/config';
export default {
  "dev": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_SCHEMA_DEV,
    "host": "127.0.0.1",
    "dialect": process.env.DB_DIALECT_DEV,
    "operatorsAliases": 0,
    "timezone": "+01:00",
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_SCHEMA_TEST,
    "host": "127.0.0.1",
    "dialect": process.env.DB_DIALECT_TEST,
    "logging": false,
    "operatorsAliases": 0,
    "timezone": "+01:00",
    "define": {
      "timestamps": false
    }
  },
  "prod": {
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_SCHEMA_PROD,
    "host": "127.0.0.1",
    "dialect": process.env.DB_DIALECT_PROD,
    "logging": false,
    "operatorsAliases": 0,
    "timezone": "+01:00",
    "define": {
      "timestamps": false
    }
  }
};