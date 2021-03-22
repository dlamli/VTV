const { Router } = require('express'),
    Usuario = require('../models/usuario'),
    router = Router();

//GET
router.get('/', async(req, res) => {

    res.render('index', {});

    // try {
    //     const usuarios = await Usuario.find();
    //     res.json(usuarios);
    // } catch (error) {
    //     res.json({
    //         error
    //     });
    // }

});

// // Submit a Usuario
// router.post('/', async(req, res) => {
//     const post = new Usuario({
//         nombre: req.body.nombre,
//         apellido_paterno: req.body.apellido_paterno,
//         apellido_materno: req.body.apellido_materno,
//         telefono: req.body.telefono,
//         cedula: req.body.cedula,
//         nacionalidad: req.body.nacionalidad,
//         clave: req.body.clave,
//         correo_electronico: req.body.correo_electronico,
//         tipoUsuario: req.body.tipoUsuario,
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

router.get('/login', (req, res) => {
    res.render('login', {});

});

router.get('/detalles', (req, res) => {

    res.render('detalles-vehiculo', {});

});

router.get('/usuario_index', (req, res) => {

    res.render('usuario_index.hbs', {

    });

});

module.exports = router;