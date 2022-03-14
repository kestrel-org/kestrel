/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - id
 *              - login
 *              - password
 *              - email
 *              - createdAt
 *              - updatedAt
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the user
 *              login:
 *                  type: string
 *                  description: The login of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              createdAt:
 *                  type: string
 *                  description: The creation date of the user
 *              updatedAt:
 *                  type: string
 *                  description: The update date of the user
 */
