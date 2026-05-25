const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ======================================
// LOGIN
// ======================================

const login = (req, res) => {

    const { email, password } = req.body;

    const query = `
        SELECT * 
        FROM usuarios 
        WHERE email = ?
    `;

    db.query(query, [email], async (err, results) => {

        // ======================================
        // ERROR SERVIDOR
        // ======================================

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Error en servidor'
            });

        }

        // ======================================
        // USUARIO NO EXISTE
        // ======================================

        if (results.length === 0) {

            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });

        }

        // ======================================
        // USUARIO ENCONTRADO
        // ======================================

        const usuario = results[0];

        // ======================================
        // VALIDAR PASSWORD
        // ======================================

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {

            return res.status(401).json({
                error: 'Contraseña incorrecta'
            });

        }

        // ======================================
        // GENERAR TOKEN
        // ======================================

        const token = jwt.sign(

            {
                id: usuario.id_usuario,
                rol: usuario.rol
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '1h'
            }

        );

        // ======================================
        // RESPUESTA LOGIN
        // ======================================

        res.json({

            message: 'Login exitoso',

            token,

            rol: usuario.rol,

            user: {

                id: usuario.id_usuario,

                nombre: usuario.nombre,

                email: usuario.email,

                rol: usuario.rol

            }

        });

    });

};

module.exports = { login };