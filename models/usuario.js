const mongoose = require("mongoose"),
  dateFormat = require('dateformat'),
  now = new Date();

let fechaActual = dateFormat(now, 'dd/mm/yyyy');

const esquema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido_paterno: {
    type: String,
    required: true,
  },
  apellido_materno: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  cedula: {
    type: Number,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  correo_electronico: {
    type: String,
    unique: true,
    required: true,
  },
  fecha_creacion: {
    type: String,
    default: fechaActual
  },
  tipoUsuario: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Usuario", esquema);
