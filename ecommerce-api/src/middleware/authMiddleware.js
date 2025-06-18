const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario está autenticado
function authenticateToken(req, res, next) {
  // Leer el token desde los headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    // Guardamos los datos del usuario decodificados (id, role) en el request
    req.user = user;

    next(); // Pasar al siguiente middleware o controlador
  });
}

module.exports = authenticateToken;
