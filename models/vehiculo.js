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
        type: Number,
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
        required: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Vehiculo", esquema);