// Acá configuramos Express, se agregan middlewares y se importan rutas
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');


const app = express();

//Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json());

//Rutas
app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/orders', orderRoutes);




// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch((err) => console.error('🔴 Error de conexión a MongoDB:', err));

module.exports = app;
