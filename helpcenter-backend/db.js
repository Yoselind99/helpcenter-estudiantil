const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yoselin1208node', // pon tu contraseña real
  database: 'helpcenter'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión establecida correctamente');
  }
});

module.exports = connection;