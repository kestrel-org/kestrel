import express from 'express';
import models from '../models/index';
const router = express.Router();


/**
 * @swagger
 *  tags:
 *    name: 'Example'
 *    description: Examples routes
 */

/**
 * @swagger
 *  /example/users:
 *    get:
 *      description: Return the users list
 *      tags: [Example]
 *      responses:
 *        200:
 *          description: The users list
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
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
 * @swagger
 *  /example/users:
 *    post:
 *      description: Create an user
 *      tags: [Example]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: The created user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
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
 * @swagger
 *  /example/users:
 *    put:
 *      description: Update an user
 *      tags: [Example]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: The updated user 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
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
 * @swagger
 *  /example/users/{id}:
 *    delete:
 *      description: Delete an user
 *      tags: [Example]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
 */
router.delete('/users/:id', async function (req, res, next) {
  try {
    await models['users'].destroy({
      where: {
        id: req.params.id
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
 * @swagger
 *  /example/users/{id}:
 *    get:
 *      description: Return the user with the id in parameters
 *      tags: [Example]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id
 *      responses:
 *        200:
 *          description: The user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
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


export default router;
