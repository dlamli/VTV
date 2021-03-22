const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido_paterno: {
        type: String,
        required: true
    },
    apellido_materno: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    correo_electronico: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Usuario', esquema);