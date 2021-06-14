const express = require('express');
const router = express.Router();

const models = require('../models');

/**
 * @typedef User
 * @property {integer} id.required - Id - eg: 1
 * @property {string} login.required - Login - eg: Ivy234
 * @property {string} password.required - Password - eg: zbtLMEv8
 * @property {string} email.required - Email - eg: Ivy234@hotmail.com
 * @property {string} createdAt.required - Creation date - eg: 2021-04-27T08:34:01.000Z
 * @property {string} updatedAt.required - Update date - eg: 2021-04-27T08:34:01.000Z
 */

/**
 * @route GET /example/users
 * @summary Return the users list
 * @group Example
 * @returns {Array.<User>} 200 - The users list
 * @returns {Error}  400 - Bad request
 * @returns {Error}  401 - Unauthorized
 */
router.get('/users', async function (req, res, next) {
  try {
    const users = await models['users'].findAll();
    res.status(200).send({
      users
    });
  } catch (err) {
    res.status(400).send({
      error: err.parent ? err.parent.sqlMessage : err.errors
    });
  }
});

/**
 * @route POST /example/users
 * @summary Create a user
 * @group Example
 * @param {User.model} user.body.required - the new user
 * @returns {User} 200 - The user created
 * @returns {Error}  400 - Bad request
 * @returns {Error}  401 - Unauthorized
 */
router.post('/users', async function (req, res, next) {
  try {
    const user = await models['users'].create(req.body);
    res.status(200).send({
      user
    });
  } catch (err) {
    res.status(400).send({
      error: err.parent ? err.parent.sqlMessage : err.errors
    });
  }
});

/**
 * @route PUT /example/users
 * @summary Update a user
 * @group Example
 * @param {User.model} user.body.required - the updated user
 * @returns {User} 200 - The updated user
 * @returns {Error}  400 - Bad request
 * @returns {Error}  401 - Unauthorized
 */
router.put('/users', async function (req, res, next) {
  try {
    // Separate id from data
    const { id: idUser, ...userData } = req.body;
    if (!idUser) {
      res.status(400).send({
        error: "Veuillez renseigner un id"
      });
    } else {
      await models['users'].update(userData, { where: { id: idUser } });
      const user = await models['users'].findByPk(idUser);
      res.status(200).send({
        user
      });
    }
  } catch (err) {
    res.status(400).send({
      error: err.parent ? err.parent.sqlMessage : err.errors
    });
  }
});

/**
 * @route DELETE /example/users
 * @summary Delete a user with the id in parameters
 * @group Example
 * @param {integer} id.query.required - the user id - eg: 1
 * @returns {object} 200 - OK
 * @returns {Error}  400 - Bad request
 * @returns {Error}  401 - Unauthorized
 */
router.delete('/users', async function (req, res, next) {
  try {
    await models['users'].destroy({
      where: {
        id: req.query.id
      }
    })
    res.status(200).send({
      msg: 'ok'
    });
  } catch (err) {
    res.status(400).send({
      error: err.parent ? err.parent.sqlMessage : err.errors
    });
  }
});

/**
 * @route GET /example/users/{id}
 * @summary Return the user with the id in parameters
 * @group Example
 * @param {integer} id.path.required - the user id - eg: 1
 * @returns {User} 200 - The user
 * @returns {Error}  400 - Bad request
 * @returns {Error}  401 - Unauthorized
 */
router.get('/users/:id', async function (req, res, next) {
  try {
    const user = await models['users'].findByPk(req.params.id);
    res.status(200).send({
      user
    });
  } catch (err) {
    res.status(400).send({
      error: err.parent ? err.parent.sqlMessage : err.errors
    });
  }
});


module.exports = router;