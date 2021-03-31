const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    _id: {
        type: Number
    },
    rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tipoUsuario', esquema);