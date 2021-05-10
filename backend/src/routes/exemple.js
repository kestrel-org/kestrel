const express = require('express');
const router = express.Router();

const models = require('../models');

/**
 * @typedef User
 * @property {integer} id.required - Identifiant - eg: 1
 * @property {string} login.required - Login - eg: Ivy234
 * @property {string} password.required - Password - eg: zbtLMEv8
 * @property {string} email.required - Email - eg: Ivy234@hotmail.com
 * @property {string} createdAt.required - Date de creation - eg: 2021-04-27T08:34:01.000Z
 * @property {string} updatedAt.required - Date de mise à jour - eg: 2021-04-27T08:34:01.000Z
 */

/**
 * @route GET /exemple/users
 * @summary Retourne la liste des utilisateurs
 * @group Exemple
 * @returns {Array.<User>} 200 - Liste des utilisateurs
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
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
 * @route POST /exemple/users
 * @summary Créer un utilisateur
 * @group Exemple
 * @param {User.model} user.body.required - le nouvel utilisateur
 * @returns {User} 200 - L'utilisateur créé
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
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
 * @route PUT /exemple/users
 * @summary Modifie un utilisateur
 * @group Exemple
 * @param {User.model} user.body.required - l'utilisateur modifié
 * @returns {User} 200 - L'utilisateur modifié
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
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
 * @route DELETE /exemple/users
 * @summary Supprime l'utilisateur dont l'id est fourni en paramètre
 * @group Exemple
 * @param {integer} id.query.required - l'identifiant de l'utilisateur - eg: 1
 * @returns {object} 200 - OK
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
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
 * @route GET /exemple/users/{id}
 * @summary Retourne l'utilisateur dont l'id est fourni en paramètre
 * @group Exemple
 * @param {integer} id.path.required - l'identifiant de l'utilisateur - eg: 1
 * @returns {User} 200 - L'utilisateur
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
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