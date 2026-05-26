const bcrypt = require('bcrypt');

// ======================================
// USUARIOS TEMPORALES
// ======================================

let usuarios = [

  {
    id_usuario: 1,
    nombre: 'Admin',
    email: 'admin@test.com',
    password: 'password',
    rol: 'admin'
  },

  {
    id_usuario: 2,
    nombre: 'Usuario',
    email: 'user@test.com',
    password: 'password',
    rol: 'usuario'
  },

  {
    id_usuario: 3,
    nombre: 'Soporte',
    email: 'soporte@test.com',
    password: 'password',
    rol: 'tecnico'
  },

  {
  id_usuario: 4,
  nombre: 'Maria Lopez',
  email: 'maria@test.com',
  password: 'password',
  rol: 'usuario'
},

{
  id_usuario: 5,
  nombre: 'Carlos Perez',
  email: 'carlos@test.com',
  password: 'password',
  rol: 'usuario'
},

{
  id_usuario: 6,
  nombre: 'Ana Torres',
  email: 'ana@test.com',
  password: 'password',
  rol: 'tecnico'
}

];

// ======================================
// REGISTRAR USUARIO
// ======================================

const registerUser = async (req, res) => {

  const { nombre, email, password, rol } = req.body;

  const rolesValidos = ['admin', 'tecnico', 'usuario'];

  try {

    if (!nombre || nombre.trim().length < 3) {

      return res.status(400).json({
        error: 'El nombre debe tener mínimo 3 caracteres'
      });

    }

    if (!email || !email.includes('@')) {

      return res.status(400).json({
        error: 'Email inválido'
      });

    }

    if (!password || password.length < 6) {

      return res.status(400).json({
        error: 'La contraseña debe tener mínimo 6 caracteres'
      });

    }

    if (!rol || !rolesValidos.includes(rol)) {

      return res.status(400).json({
        error: 'Rol inválido'
      });

    }

    const nuevoUsuario = {

      id_usuario: usuarios.length + 1,

      nombre,

      email,

      password,

      rol

    };

    usuarios.push(nuevoUsuario);

    res.json({
      message: 'Usuario registrado correctamente',
      user: nuevoUsuario
    });

  } catch (error) {

    res.status(500).json({
      error: 'Error al registrar usuario'
    });

  }

};

// ======================================
// OBTENER USUARIOS
// ======================================

const getUsers = (req, res) => {

  res.json({

    message: 'Usuarios obtenidos correctamente',

    data: usuarios

  });

};

// ======================================
// EXPORTAR
// ======================================

module.exports = {
  registerUser,
  getUsers
};