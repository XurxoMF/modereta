const mongoose = require('mongoose');

const accionesSchema = new mongoose.Schema({
  usuario: String,
  accion: String,
  cant: Number
});

module.exports = mongoose.model('acciondb', accionesSchema);