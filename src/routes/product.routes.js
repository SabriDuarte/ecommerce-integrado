const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Rutas públicas
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (solo admin)
router.post('/', authenticateToken, authorizeRole('admin'), productController.createProduct);
router.put('/:id', authenticateToken, authorizeRole('admin'), productController.updateProduct);
router.delete('/:id', authenticateToken, authorizeRole('admin'), productController.deleteProduct);

module.exports = router;
