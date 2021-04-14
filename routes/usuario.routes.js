const { Router } = require("express"),
  bcrypt = require('bcrypt'),
  nodemailer = require('nodemailer'),
  router = Router();

const Usuario = require("../models/usuario"),
  Venta = require('../models/venta'),
  Vehiculo = require('../models/vehiculo');


// Validacion de correo
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pruebaconfirma@gmail.com',
    pass: 'confirma123'
  }
});

let mailOptions = {
  from: 'pruebaconfirma@gmail.com',
  to: 'sebasq13@outlook.com',
  subject: 'Prueba',
  text: 'Correo'
};

// GET

// Index
router.get("/", async (req, res) => {
  try {

    await Vehiculo.find({}, (err, dato) => {
      if (err) { res.json(err) }
      else {
        res.render('index', { vehiculoDB: dato });
      }
    });

  } catch (error) {
    res.json({
      error
    });
  }
});

// Login
router.get("/login", async (req, res) => {
  try {
    res.render("login", {});
  } catch (error) {
    res.json({
      error
    })
  }
});

// Ventas
router.get("/registrarV", async (req, res) => {
  await Vehiculo.find({}, (err, datoVehiculo) => {
    if (err) { res.json(err) }
    else {
      Usuario.find({}, (err, dato) => {
        if (err) { res.json(err) }
        else {
          res.render('ventaForm', { vehiculoDB: datoVehiculo, usuarioDB: dato });
        }
      });
      // res.render('ventaForm', { vehiculoDB: dato });
    }
  });
});

// Detalles Vehiculo
router.get("/detalles", (req, res) => {
  res.render("detalles-vehiculo", {});
});

// Index del usuario
router.get("/usuario_index", async (req, res) => {
  try {
    await Venta.find({}, (err, dato) => {
      if (err) { res.json(err) }
      else {
        res.render('usuario_index', { ventaDB: dato });
      }
    });
  } catch (error) {
    res.json({
      error
    });
  }


});

router.get("/verCuenta", async (req, res) => {
  res.render('verCuenta');
})


// POST

// Insercion de usuario
router.post("/registrar", async (req, res) => {
  try {
    let { clave, email } = req.body;

    const post = new Usuario({
      nombre: req.body.nombreUsuario,
      apellido_paterno: req.body.apellidoP,
      apellido_materno: req.body.apellidoM,
      telefono: req.body.tel,
      cedula: req.body.cedula,
      nacionalidad: req.body.country,
      clave: bcrypt.hashSync(clave, 10),
      correo_electronico: req.body.email,
      tipoUsuario: req.body.tipoUsuario,

    });

    await Usuario.findOne({ correo_electronico: email }, async (err, result) => {
      if (err) { console.log(err); }

      else if (result) {
        req.session.mensaje = {
          tipo: 'danger',
          titulo: '|Error|',
          error: 'Ya existe el correo electrónico'
        }
        res.redirect('/login');
      }

      else {
        const saveInfo = await post.save();
        req.session.mensaje = {
          tipo: 'success',
          titulo: '|Registro exitoso|',
          error: 'Se ha creado el usuario'
        }
        res.redirect('/login');

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });
      }

    });

  } catch (error) {
    res.json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let { usuario, pass } = req.body;

    await Usuario.findOne({ nombre: usuario }, async (err, dbUsuario) => {
      if (err) { res.json(err) }

      else if (dbUsuario) {
        let validarClave = await bcrypt.compare(pass, dbUsuario.clave);

        if (validarClave) {

          if (dbUsuario.tipoUsuario == 0) {
            res.render('usuario_index', {
              usuario: {
                id: dbUsuario._id,
                nombre: dbUsuario.nombre
              }
            });
          }
          else if (dbUsuario.tipoUsuario == 1) { res.render('admin_index'); }
        }
        else {
          req.session.mensaje = {
            tipo: 'danger',
            titulo: '|Error|',
            error: 'La clave es inválida'
          }
          res.redirect('/login');
        }
      }

      else {
        req.session.mensaje = {
          tipo: 'primary',
          titulo: 'Ups!',
          error: 'El usuario no existe en la base de datos'
        }
        res.redirect('/login');
      }

    })

  } catch (error) {
    res.json({
      msg: "Usuario no existe en la base de datos"
    });
  }

});

router.post("/registrarV", async (req, res) => {
  try {
    const { vehiculoID } = req.body;

    const getVehiculoId = await Vehiculo.findById({ _id: vehiculoID });

    let imgURL = getVehiculoId.img;

    const venta = new Venta({
      vehiculo_id: vehiculoID,
      cliente_id: req.body.usuarioID,
      precio: req.body.precio,
      img: imgURL
    });

    venta.save();
    req.session.mensaje = {
      tipo: 'success',
      titulo: '|Venta registrado|',
      error: 'Se registro la venta correctamente'
    }
    res.redirect('/usuario_index');

  } catch (error) {
    res.json(error)
  }
});

module.exports = router;
