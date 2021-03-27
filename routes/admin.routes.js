const { Router } = require("express"),
  bodyParser = require("body-parser"),
  router = Router();

const tipoUsuario = require("../models/tipoUsuario"),
  Usuario = require("../models/usuario");


//GET
router.get("/admin_index", (req, res) => {
  res.render("admin_index.hbs", {
    rol: "Admin",
  });

});

router.get("/usuario_lista", async (req, res) => {
  res.render("usuario_lista", {});
  let lista_usuario = await Usuario.find();
  // res.json({
  //   lista_usuario
  // })
});

router.get("/subasta_lista", (req, res) => {
  res.render("subasta_lista", {});
});

// POST

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

// // Delete Usuario
// router.delete('/:id', async(req, res) => {
//     try {
//         const deleteUsuario = await Usuario.remove({ _id: req.params.id });
//         res.json({
//             msg: 'Usuario eliminado',
//             deleteUsuario
//         });
//     } catch (error) {
//         res.json({
//             msg: error
//         });
//     }
// });

// // Update Usuario
// router.patch('/:id', async(req, res) => {
//     try {
//         const updateUsuario = await Usuario.updateOne({ _id: req.params.id }, { $set: { nombre: req.body.nombre } });
//         res.json({
//             msg: 'Usuario actualizado',
//             updateUsuario
//         });
//     } catch (error) {
//         res.json({
//             msg: error
//         });
//     }
// });

module.exports = router;
