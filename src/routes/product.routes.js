const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Obtener todos los productos (con autenticación)
router.get('/', authenticateToken, productController.getProducts);

// Crear producto (solo admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  productController.createProduct
);

// ... podés agregar más rutas luego

module.exports = router;
