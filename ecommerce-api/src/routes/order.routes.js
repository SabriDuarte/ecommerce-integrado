const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Crear pedido (cliente)
router.post('/', authenticateToken, authorizeRole('cliente'), orderController.createOrder);

// Historial de pedidos (cliente)
router.get('/my-orders', authenticateToken, authorizeRole('cliente'), orderController.getMyOrders);

// Todos los pedidos (admin)
router.get('/', authenticateToken, authorizeRole('admin'), orderController.getAllOrders);

// Cambiar estado del pedido (admin)
router.put('/:id', authenticateToken, authorizeRole('admin'), orderController.updateOrderStatus);

module.exports = router;
