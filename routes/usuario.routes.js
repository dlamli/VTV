const { Router } = require("express"),
  bcrypt = require('bcrypt'),
  router = Router();

const e = require("express");
const Usuario = require("../models/usuario");

// GET

// Index
router.get("/", (req, res) => {
  try {
    res.render("index", {});

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
router.get("/registroVenta", (req, res) => {
  res.render("ventaForm", {});
});

// Detalles Vehiculo
router.get("/detalles", (req, res) => {
  res.render("detalles-vehiculo", {});
});

// Index del usuario
router.get("/usuario_index", (req, res) => {
  res.render("usuario_index.hbs", {});


});

// POST

// Insercion de usuario
router.post("/registrar", async (req, res) => {
  try {
    let { clave, email } = req.body;

    const post = new Usuario({
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellidoP,
      apellido_materno: req.body.apellidoM,
      telefono: req.body.tel,
      cedula: req.body.cedula,
      nacionalidad: req.body.country,
      clave: bcrypt.hashSync(clave, 10),
      correo_electronico: req.body.email
    });


    await Usuario.findOne({ correo_electronico: email }, async (err, result) => {
      if (err) { console.log(err); }

      else if (result) { res.json({ msg: "Ya existe el correo electrónico " }); }

      else {
        const saveInfo = await post.save();
        res.json(saveInfo);
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
    const $usuario = await Usuario.findOne({ nombre: usuario }),
      validarClave = await bcrypt.compare(pass, $usuario.clave);

    if ($usuario) {
      if (validarClave) {
        // res.json({
        //   msg: "Las claves coinciden",
        //   $usuario
        // });
        res.redirect('/usuario_index');
      }

      else { res.json({ msg: "Las claves es inválida" }); }

    }

    else { res.json({ msg: "Usuario no existe en la base de datos" }); }

  } catch (error) {
    res.json({
      msg: "Usuario no existe en la base de datos"
    });
  }

});

module.exports = router;
