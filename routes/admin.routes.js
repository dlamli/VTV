const { Router } = require("express"),
  path = require('path'),
  multer = require('multer'),
  router = Router();


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
        Venta.find({ estado: 1 }, (err, datoVenta) => {
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

// Información del vehículo
router.get('/sobreVehiculo/:vehiculoID', async (req, res) => {
  try {
    await Vehiculo.findOne({ _id: req.params.vehiculoID }, (err, datoVehiculo) => {
      if (err) { res.json(err) }
      else {
        res.render('detalles-vehiculo',
          { vehiculoDB: datoVehiculo }
        );
      }
    });

  } catch (error) {
    res.json({
      error
    });
  }
});

//Información de venta
router.get('/sobreVenta/:ventaID', async (req, res) => {
  try {
    await Venta.findOne({ _id: req.params.ventaID }, (err, data) => {
      if (err) { res.json(err) }
      else {
        res.render('detalles-venta',
          { ventaDB: data },
        );
      }
    });

  } catch (error) {
    res.json({
      error
    });
  }
});

// Actualizar usuario
router.get('/usuario/actualizar/:usuarioID', (req, res) => {
  try {
    Usuario.findById(req.params.usuarioID, (err, dato) => {
      if (err) { res.json(err) }

      res.render('datoUsuario',
        { usuarioDB: dato },
      );
    });

  } catch (error) {
    res.json({ error });
  }
});

// Actualizar vehiculo
router.get('/vehiculo/actualizar/:vehiculoID', (req, res) => {
  try {
    Vehiculo.findById(req.params.vehiculoID, (err, dato) => {
      if (err) { res.json(err) }

      res.render('datoVehiculo',
        { vehiculoDB: dato },
      );
    });

  } catch (error) {
    res.json({ error });
  }
});

// Eliminar ID
router.get('/delete/usuario/:userID', (req, res) => {
  Usuario.findByIdAndRemove(req.params.userID, (err, doc) => {

    if (!err) {
      res.redirect('/usuario_lista');
    } else {
      res.json({
        msg: 'Ocurrió un error al eliminar un usuario',
        err
      })
    }

  });
});

// Eliminar venta
router.get('/delete/venta/:ventaID', (req, res) => {
  Venta.findByIdAndUpdate(req.params.ventaID, { estado: 0 }, (err, doc) => {

    if (!err) {
      res.redirect('/venta_lista');
    } else {
      res.json({
        msg: 'Ocurrió un error al eliminar la venta',
        err
      })
    }

  });
});

// Eliminar vehiculo
router.get('/delete/vehiculo/:vehiculoID', (req, res) => {
  Vehiculo.findByIdAndRemove(req.params.vehiculoID, (err, doc) => {

    if (!err) {
      req.session.mensaje = {
        tipo: 'success',
        titulo: 'Vehículo eliminado',
        error: 'Se ha eliminado correctamente el vehiculo'
      }
      res.redirect('/admin_index');
    } else {
      res.json({
        msg: 'Ocurrió un error al eliminar la venta',
        err
      })
    }

  });
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
  await Venta.find({ estado: 1 }, (err, dato) => {
    if (err) { res.json(err) }
    else {
      res.render("venta_lista", { ventaDB: dato });
    }
  });

});

router.get("/vehiculo_lista", async (req, res) => {
  await Vehiculo.find({}, (err, dato) => {
    if (err) { res.json(err) }
    else {
      res.render("vehiculo_lista", { vehiculoDB: dato });
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

router.post("/usuario/actualizar", (req, res) => {

  actualizar(req, res)

});

router.post("/vehiculo/actualizar", (req, res) => {
  actualizarVehiculo(req, res);
});

const actualizar = (req, res) => {
  Usuario.findByIdAndUpdate({ _id: req.body._id },
    {
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      correo_electronico: req.body.email,
      telefono: req.body.tel
    }, { new: true },
    (err, doc) => {
      if (!err) {

        res.redirect('/usuario_lista');

      }
      else {
        res.json({ msg: 'Ocurrio un error' });
      }
    });
};

const actualizarVehiculo = (req, res) => {
  Vehiculo.findByIdAndUpdate({ _id: req.body._id },
    {
      modelo: req.body.modelo,
      cilindraje: req.body.cilindraje,
      condicionVehiculo: req.body.condicionVehiculo,
    }, { new: true },
    (err, doc) => {
      if (!err) {

        res.redirect('/vehiculo_lista');

      }
      else {
        res.json({ msg: 'Ocurrio un error' });
      }
    });
};

// DELETE
//=====================================================================
// Delete Usuario por Id
router.delete('/:id', async (req = request, res = response) => {
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
//=====================================================================

module.exports = router;
