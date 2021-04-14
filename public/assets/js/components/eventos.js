const btnMostrar = document.getElementById('btnMostrar');
const optionVehiculoID = document.querySelector('#vehiculoID');
const inputModeloVehiculo = document.getElementById('modeloVehiculo');


// const Usuario = require("../models/usuario"),
//     Vehiculo = require('../models/vehiculo');

// optionVehiculoID.addEventListener('change', () => {
//     const getVehiculoId = Vehiculo.findById({ _id: vehiculo_ID });

//     switch (vehiculo_ID) {
//         case vehiculo_ID:
//             inputModeloVehiculo.value = getVehiculoId.modelo;
//             break;
//         default:
//             inputModeloVehiculo.value = ''
//             break;
//     }
// });

btnMostrar.addEventListener('mouseup', () => {

    let vehiculo_ID = optionVehiculoID.value;
    console.log(vehiculo_ID);

});