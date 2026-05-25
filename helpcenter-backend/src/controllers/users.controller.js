const db = require('../config/db');
const bcrypt = require('bcrypt');

// ======================================
// REGISTRAR USUARIO
// ======================================

const registerUser = async (req, res) => {

  const { nombre, email, password, rol } = req.body;

  const rolesValidos = ['admin', 'tecnico', 'usuario'];

  try {

    // 🔹 Validar nombre
    if (!nombre || nombre.trim().length < 3) {

      return res.status(400).json({
        error: 'El nombre debe tener mínimo 3 caracteres'
      });

    }

    // 🔹 Validar email
    if (!email || !email.includes('@')) {

      return res.status(400).json({
        error: 'Email inválido'
      });

    }

    // 🔹 Validar password
    if (!password || password.length < 6) {

      return res.status(400).json({
        error: 'La contraseña debe tener mínimo 6 caracteres'
      });

    }

    // 🔹 Validar rol
    if (!rol || !rolesValidos.includes(rol)) {

      return res.status(400).json({
        error: 'Rol inválido'
      });

    }

    // 🔹 Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios
      (nombre, email, password, rol)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      query,
      [nombre, email, hashedPassword, rol],
      (err, result) => {

        if (err) {

          return res.status(500).json({
            error: 'Error al registrar usuario'
          });

        }

        res.json({
          message: 'Usuario registrado correctamente'
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      error: 'Error al encriptar contraseña'
    });

  }

};

// ======================================
// OBTENER USUARIOS
// ======================================

const getUsers = (req, res) => {

  const query = `
    SELECT 
      id_usuario,
      nombre,
      email,
      rol
    FROM usuarios
  `;

  db.query(query, (err, results) => {

    if (err) {

      return res.status(500).json({
        error: 'Error al obtener usuarios'
      });

    }

    res.json({
      message: 'Usuarios obtenidos correctamente',
      data: results
    });

  });

};

// ======================================
// EXPORTAR
// ======================================

module.exports = {
  registerUser,
  getUsers
};
