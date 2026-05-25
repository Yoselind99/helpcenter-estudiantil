const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth.controller');
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login exitoso
 */

router.post('/login', login);

module.exports = router;
