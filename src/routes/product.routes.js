const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getAllProducts);

module.exports = router;
