const { Router } = require('express'),
    Usuario = require('../models/usuario'),
    tipoUsuario = require('../models/tipoUsuario'),
    router = Router();

//GET
// Index
router.get('/', async(req, res) => {

    try {
        const usuario = await Usuario.find();
        res.render('index', {});
        // res.json(usuario);
    } catch (error) {
        res.json({
            error
        });
    }

});

// Login
router.get('/login', (req, res) => {
    res.render('login', {});

});

// Detalles Vehiculo
router.get('/detalles', (req, res) => {

    res.render('detalles-vehiculo', {});

});

// Index del usuario
router.get('/usuario_index', (req, res) => {

    res.render('usuario_index.hbs', {

    });

});


// Insercion de usuario
router.post('/', async(req, res) => {
    let nombreUsuario = req.body.nombre;
    const post = new Usuario({
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        telefono: req.body.telefono,
        cedula: req.body.cedula,
        nacionalidad: req.body.nacionalidad,
        clave: req.body.clave,
        correo_electronico: req.body.correo_electronico,
        tipoUsuario: req.body.tipoUsuario,
    });

    try {
        Usuario.findOne({ nombre: nombreUsuario }, async(err, result) => {
            if (err) console.log(err);
            if (result) {
                console.log("Este nombre ya existe");
                res.json({
                    msg: "El nombre ya se encuentra"
                })
            } else {
                const saveInfo = await post.save();
                res.json(saveInfo);
            }
        });
    } catch (error) {
        res.json({
            error
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