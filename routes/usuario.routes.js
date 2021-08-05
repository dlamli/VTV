const { Router } = require("express"),
    router = Router();

const {
    getIndex,
    getLogin,
    getDetalles,
    getIndexUsuario,
    getVenta,
    getCuenta,
    postUsuario,
    postLogin,
    postVehiculo
} = require("../controllers/user.controller");

//GET
//=====================================================================
// Index
router.get("/", getIndex);
// Login
router.get("/login", getLogin);
// Ventas
router.get("/ventas", getVenta);
// Detalles Vehiculo
router.get("/detalles", getDetalles);
// Index del usuario
router.get("/usuario_index", getIndexUsuario);
//Cuenta
router.get("/verCuenta", getCuenta)
//=====================================================================

// POST
//=====================================================================
//Registrar usuario
router.post("/registrar", postUsuario);
// Login
router.post("/login", postLogin);
//Registrar Vehiculo
router.post("/registrar/vehiculo", postVehiculo);
//=====================================================================

module.exports = router;
