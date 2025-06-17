// Esta función recibe como parámetro el rol requerido para acceder a una ruta (por ejemplo: "admin")
function authorizeRole(requiredRole) {
  
  // Retorna un middleware que se ejecuta en la ruta protegida
  return (req, res, next) => {

    // Verifica si el usuario autenticado (req.user) tiene el rol necesario
    if (req.user.role !== requiredRole) {
      
      // Si no tiene el rol adecuado, responde con error 403 (Prohibido)
      return res.status(403).json({
        message: 'Acceso denegado: se requiere rol de ' + requiredRole
      });
    }

    // Si tiene el rol correcto, pasa al siguiente middleware o controlador
    next();
  };
}

// Exportamos la función para poder usarla en las rutas
module.exports = authorizeRole;

