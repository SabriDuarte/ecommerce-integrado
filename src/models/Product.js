//Importa a mongoose
const mongoose = require('mongoose');

//Creamos el esquema del producto
const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    default: ''
  }
});
//exporta el modelo
module.exports = mongoose.model('Product', productSchema);
