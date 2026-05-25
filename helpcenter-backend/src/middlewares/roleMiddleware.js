const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {

    const userRole = req.user?.rol;

    // Validar que el usuario tenga rol
    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: 'Rol no definido en el token'
      });
    }

    // Validar que el rol esté permitido
    if (!rolesPermitidos.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado: rol no autorizado'
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
