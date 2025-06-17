// 1. Importamos los modelos necesarios
const Order = require('../models/order.model');
const Product = require('../models/Product');

// Crear pedido (cliente)
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;

    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: 'Producto no disponible o stock insuficiente' });
      }

      // Descontar stock
      product.stock -= item.quantity;
      await product.save();

      orderItems.push({ product: product._id, quantity: item.quantity });
    }

    const newOrder = await Order.create({
      user: userId,
      products: orderItems,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pedido', error: err.message });
  }
};

// Ver historial del cliente
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: err.message });
  }
};

// Ver todos los pedidos (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener todos los pedidos', error: err.message });
  }
};

// Cambiar estado del pedido (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar estado', error: err.message });
  }
};