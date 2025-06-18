// 1. Importar dependencias
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// 2. Rutas
router.post('/register', authController.register);
router.post('/login', authController.login); // 

// Ruta protegida de ejemplo
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Accediste al perfil privado',
    user: req.user
  });
});

// Ruta solo para ADMIN
router.get('/admin-only', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Hola admin, esta ruta es privada' });
});

// 3. Exportar router
module.exports = router;
