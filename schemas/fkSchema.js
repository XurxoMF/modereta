const mongoose = require('mongoose');

const fkSchema = new mongoose.Schema({
  nombre: String,
  bit1: String,
  bit2: String,
  foto: String,
  color: String
});

module.exports = mongoose.model('kfdb', fkSchema);