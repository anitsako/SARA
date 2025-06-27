const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: String,
  proveedor: String,
  stock: { type: Number, default: 0 },
  precio: { type: Number, default: 0 },
  ventas: [Number] // Ej: ventas mensuales para IA
});

module.exports = mongoose.model('Producto', productoSchema);
