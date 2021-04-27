const express = require('express');
const router = express.Router();
const request = require("request");

const models = require('../models');

/**
 * @route GET /exemple
 * @summary Exemple d'API
 * @group Exemple
 * @param {number} number.query.required - nombre - eg: 2
 * @returns {object} 200 - Le nombre saisi
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
 */
router.get('/', function (req, res, next) {
  res.status(200).send({
    msg: 'ok',
    number: req.query.number
  });
});

/**
 * @route GET /exemple/users
 * @summary Liste des utilisateurs
 * @group Exemple
 * @returns {object} 200 - La liste des utilisateurs
 * @returns {Error}  400 - Erreur dans la syntaxe de la requête
 * @returns {Error}  401 - Erreur lors de l'authentification
 */
router.get('/users', async function (req, res, next) {
  const users = await models['users'].findAll();
  res.status(200).send({
    users: users
  });
});


module.exports = router;