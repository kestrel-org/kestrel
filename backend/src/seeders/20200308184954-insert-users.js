'use strict';

const {faker} = require('@faker-js/faker');

const users = Array(100).fill(0).map((user) => (
  {
    login: faker.internet.userName(),
    password: faker.internet.password(8),
    email: faker.internet.email(),
  }
));

module.exports =  {
  up: (queryInterface, Sequelize) => {

    /**
     * * If not using faker to generate fake data
     */
    // return queryInterface.bulkInsert('users', [
    //   {
    //     login: "login",
    //     password: "password",
    //     email: "email"
    //   }
    // ], {});

    return queryInterface.bulkInsert('users',users , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
