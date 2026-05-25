const express = require('express');
const router = express.Router();

const {
    registerUser,
    getUsers
} = require('../controllers/users.controller');

// ======================================
// REGISTRAR USUARIO
// ======================================

router.post('/register', registerUser);

// ======================================
// OBTENER USUARIOS
// ======================================

router.get('/', getUsers);

module.exports = router;
