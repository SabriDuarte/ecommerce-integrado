const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, productController.getProducts);

module.exports = router;
