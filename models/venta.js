const mongoose = require("mongoose"),
    dateFormat = require('dateformat'),
    now = new Date();

let fechaActual = dateFormat(now, 'dd/mm/yyyy');


const esquema = mongoose.Schema({
    vehiculo_id: {
        type: String,
        required: true,
    },
    cliente_id: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true,
    },
    fecha_venta: {
        type: String,
        default: fechaActual
    },
    estado: {
        type: Number,
        default: 1
    },
    img: {
        type: String,
    },
});

module.exports = mongoose.model("Venta", esquema);