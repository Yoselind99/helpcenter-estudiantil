const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Usuarios temporales
const usuarios = [
  {
    id_usuario: 1,
    nombre: 'Admin',
    email: 'admin@test.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    rol: 'admin'
  },
  {
    id_usuario: 2,
    nombre: 'Usuario',
    email: 'user@test.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    rol: 'usuario'
  }
];

const login = async (req, res) => {

  const { email, password } = req.body;

  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    return res.status(401).json({
      error: 'Credenciales incorrectas'
    });
  }

  const passwordValida = await bcrypt.compare(
    password,
    usuario.password
  );

  if (!passwordValida) {
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