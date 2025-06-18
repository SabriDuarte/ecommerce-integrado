// 1. Importar mongoose
const mongoose = require('mongoose');

// 2. Crear el esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  
  role: {
    type: String,
    enum: ['admin', 'cliente'],
    default: 'cliente',
  }
}, { timestamps: true });

// 3. Exportar el modelo
module.exports = mongoose.model('User', userSchema);
