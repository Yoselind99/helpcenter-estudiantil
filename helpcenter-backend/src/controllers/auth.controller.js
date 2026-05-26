const jwt = require('jsonwebtoken');

// Usuarios temporales
const usuarios = [
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
  }
];

const login = async (req, res) => {

  const { email, password } = req.body;

  const usuario = usuarios.find(u => u.email === email);
  console.log("EMAIL RECIBIDO:", email);
console.log("USUARIOS:", usuarios);
console.log("USUARIO ENCONTRADO:", usuario);

  if (!usuario) {
    return res.status(401).json({
      error: 'Credenciales incorrectas'
    });
  }

  if (password !== usuario.password) {

    return res.status(401).json({
      error: 'Contraseña incorrecta'
    });

  }

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

  res.json({
    message: 'Login exitoso',
    token,
    user: usuario
  });

};

module.exports = { login };