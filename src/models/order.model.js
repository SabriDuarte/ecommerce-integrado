// Importamos mongoose para trabajar con modelos y esquemas de MongoDB
const mongoose = require('mongoose');

// Definimos el esquema del pedido (Order)
const orderSchema = new mongoose.Schema({

  // Referencia al usuario que realiza el pedido
  user: { 
    type: mongoose.Schema.Types.ObjectId,   // Relación con el modelo User
    ref: 'User',                            // Nombre del modelo referenciado
    required: true                          // Campo obligatorio
  },

  // Array de productos que se piden
  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, // Relación con el modelo Product
        ref: 'Product',                       // Nombre del modelo referenciado
        required: true
      },
      quantity: {
        type: Number,                         // Cantidad del producto
        required: true                        // Campo obligatorio
      }
    }
  ],

  // Estado del pedido
  status: {
    type: String,
    enum: ['pendiente', 'enviado', 'cancelado'], // Solo se permiten estos valores
    default: 'pendiente'                         // Por defecto, el pedido comienza como pendiente
  }

}, { timestamps: true }); // timestamps agrega automáticamente createdAt y updatedAt

// Exportamos el modelo Order para usarlo en otros archivos
module.exports = mongoose.model('Order', orderSchema);
