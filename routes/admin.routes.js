const { Router } = require("express"),
  path = require('path'),
  multer = require('multer'),
  router = Router();

const {
  getAdmin,
  getListaUsuario,
  getSubasta,
  postVehiculo,
  postVehiculoId,
  deleteUsuario,
  postRol,
  postUsuarioId,
  putUsuario,
  getVehiculo
} = require("../controllers/admin.controller");


const storage = multer.diskStorage({
  // Ruta de destino de img
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images');
  },
  // Almacenamiento de la img por el formato (fecha-nombre.jpg/png)
  filename: function (req, file, cb) {
    let date = new Date();
    //ruta de acceso img
    // uploads/images/2021-3-9-asus.jpg
    cb(null, date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '-' + file.originalname);
  }

});

// Validaciones de img
const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Rechazar img
    cb(null, false);
  }

};

const upload = multer(
  {
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter
  }
);

//GET
//=====================================================================
//Admin index
router.get("/admin_index", getAdmin);
//Lista de usuario
router.get("/usuario_lista", getListaUsuario);
//Lista de subasta
router.get("/subasta_lista", getSubasta);
//Vehiculo
router.get("/vehiculo", getVehiculo);
//=====================================================================

// POST
//=====================================================================
//Registrar vehiculo
router.post("/vehiculo", upload.single('img'), postVehiculo);
//Buscar behiculo por Id
router.post("/findID", postVehiculoId);
// Insercion de roles
router.post('/role', postRol);
// Consigue el usuario por id
router.post('/:id', postUsuarioId);
//=====================================================================

//PUT
//=====================================================================
// Update Usuario
router.put('/:id', putUsuario);
//=====================================================================

// DELETE
//=====================================================================
// Delete Usuario por Id
router.delete('/:id', deleteUsuario);
//=====================================================================

module.exports = router;
