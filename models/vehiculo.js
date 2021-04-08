const mongoose = require("mongoose");

const esquema = mongoose.Schema({
    modelo: {
        type: String,
        required: true,
    },
    anho: {
        type: Number,
        required: true,
    },
    cilindraje: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    cantidadPasajeros: {
        type: Number,
        required: true,
    },
    condicionVehiculo: {
        type: String,
        required: true,
    },
    kilometraje: {
        type: Number,
        required: true,
    },
    extras: {
        type: String,
        default: 'No hay extras.'
    },
    img: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Vehiculo", esquema);