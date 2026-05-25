const { fail } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err); // muestra error en consola

  return fail(
    res,
    err.message || 'Error interno del servidor',
    err.status || 500
  );
};

module.exports = errorHandler;