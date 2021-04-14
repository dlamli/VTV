const { Router } = require("express"),
  path = require('path'),
  multer = require('multer'),
  router = Router();

const tipoUsuario = require("../models/tipoUsuario"),
  Usuario = require("../models/usuario"),
  Vehiculo = require("../models/vehiculo"),
  Venta = require("../models/venta");

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
router.get("/admin_index", async (req, res) => {
  try {
    await Vehiculo.find({}, (err, datoVehiculo) => {
      if (err) { res.json(err) }
      else {
        Venta.find({}, (err, datoVenta) => {
          res.render('admin_index',
            {
              vehiculoDB: datoVehiculo,
              ventaDB: datoVenta,
              rol: "Admin",
            }
          );
        });
      }
    });

  } catch (error) {
    res.json({
      error
    });
  }

});

router.get("/usuario_lista", async (req, res) => {
  await Usuario.find({ tipoUsuario: 0 }, (err, dato) => {
    if (err) { res.json(err) }
    else {
      res.render("usuario_lista", { usuarioDB: dato });
    }
  });
});

router.get("/subasta_lista", (req, res) => {
  res.render("subasta_lista", {});
});

router.get("/venta_lista", async (req, res) => {
  await Venta.find({}, (err, dato) => {
    if (err) { res.json(err) }
    else {
      res.render("venta_lista", { ventaDB: dato });
    }
  });
});

router.get("/vehiculo", async (req, res) => {
  res.render('registroVehiculo');
});

// POST
router.post("/vehiculo", upload.single('img'), async (req, res) => {
  try {

    let imgDB = req.file.path.replace('public\\', "");

    const vehiculo = new Vehiculo({
      modelo: req.body.modelo,
      cilindraje: req.body.cilindraje,
      anho: req.body.ahno,
      color: req.body.color,
      condicionVehiculo: req.body.condicion,
      cantidadPasajeros: req.body.cantidadPasajeros,
      kilometraje: req.body.kilometraje,
      extras: req.body.infoExtra,
      img: imgDB
    });

    console.log(req.file);

    await vehiculo.save();

    req.session.mensaje = {
      tipo: 'success',
      titulo: 'Registro insertado',
      error: 'Se ha insertado correctamente el vehiculo'
    }
    res.redirect('admin_index');


  } catch (error) {

    req.session.mensaje = {
      tipo: 'danger',
      titulo: '|Error|',
      error: 'Solo se acepta imágenes en formato .jpeg o .png'
    }
    res.redirect('admin_index');
  }
});

// ID
// router.post("/findID", async (req, res) => {
//   try {
//     const getVehiculoId = await Vehiculo.findById({ _id: req.body.id });

//     res.json(getVehiculoId.img);

//   } catch (error) {
//     res.json(error);
//   }
// });

// DELETE
// Delete Usuario
router.delete('/:id', async (req, res) => {
  try {
    const deleteUsuario = await Usuario.remove({ _id: req.params.id });
    res.json({
      msg: 'Usuario eliminado',
      deleteUsuario
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});

// Update Usuario
router.put('/:id', async (req, res) => {
  try {
    const updateUsuario = await Usuario.updateOne({ _id: req.params.id }, {
      $set: {
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        telefono: req.body.telefono,
        cedula: req.body.cedula,
        nacionalidad: req.body.nacionalidad,
        clave: req.body.clave,
        correo_electronico: req.body.correo_electronico,
      }
    });
    res.json({
      msg: 'Usuario actualizado',
      updateUsuario
    });
  } catch (error) {
    res.json({
      msg: error
    });
  }
});

// Insercion de roles
// router.post('/', async(req, res) => {
//     const post = new tipoUsuario({
//         id: req.body._id,
//         rol: req.body.rol
//     });

//     try {
//         const saveInfo = await post.save();
//         res.json(saveInfo);
//     } catch (error) {
//         res.json({
//             error
//         });
//     }
// });

// // Consigue el usuario por id
// router.get('/:id', async(req, res) => {
//     try {
//         const getUsuarioId = await Usuario.findById(req.params.id);
//         res.json({
//             msg: 'Usuario insertado',
//             getUsuarioId
//         });
//     } catch (error) {
//         res.json({
//             msg: error
//         });
//     }

// });


module.exports = router;
