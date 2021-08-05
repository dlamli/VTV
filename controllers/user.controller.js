const { request, response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require("../models/usuario"),
    Venta = require('../models/venta'),
    Vehiculo = require('../models/vehiculo');


//=====================================================================
const getIndex = async (req = request, res = response) => {
    try {
        res.render("index");
        // await Vehiculo.find({}, (err, dato) => {
        //     if (err) { res.json(err) }
        //     else {
        //         res.render('index', { vehiculoDB: dato });
        //     }
        // });
    } catch (error) {
        res.json({
            error
        });
    }
}

const getLogin = (req = request, res = response) => {
    try {
        res.render("login");
    } catch (error) {
        res.json({
            error
        })
    }
}

const getVenta = async (req = request, res = response) => {
    await Vehiculo.find({}, (err, datoVehiculo) => {
        if (err) { res.json(err) }
        else {
            Usuario.find({}, (err, dato) => {
                if (err) { res.json(err) }
                else {
                    res.render('ventaForm', { vehiculoDB: datoVehiculo, usuarioDB: dato });
                }
            });
        }
    });
}

const getDetalles = (req = request, res = response) => {
    res.render("detalles-vehiculo");
}

const getIndexUsuario = async (req = request, res = response) => {
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
}

const getCuenta = async (req = request, res = response) => {
    res.render('verCuenta');
}
//=====================================================================



//=====================================================================
const postUsuario = async (req = request, res = response) => {
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
                await post.save();
                req.session.mensaje = {
                    tipo: 'success',
                    titulo: '|Registro exitoso|',
                    error: 'Se ha creado el usuario'
                }
                res.redirect('/login');
            }

        });

    } catch (error) {
        res.json({ error });
    }
}

const postLogin = async (req = request, res = response) => {
    try {
        let { usuario, pass } = req.body;

        await Usuario.findOne({ nombre: usuario }, async (err, dbUsuario) => {

            if (err) { res.json(err) }

            else if (dbUsuario) {
                let validarClave = await bcrypt.compare(pass, dbUsuario.clave);

                if (validarClave) {

                    if (dbUsuario.tipoUsuario == 1) { res.render('api/admin/admin_index'); }
                    else {
                        res.render('usuario_index', {
                            usuario: {
                                id: dbUsuario._id,
                                nombre: dbUsuario.nombre
                            }
                        });
                    }
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

}

const postVehiculo = async (req = request, res = response) => {
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
}
//=====================================================================

module.exports = {
    getIndex,
    getLogin,
    getVenta,
    getDetalles,
    getIndexUsuario,
    getCuenta,
    postUsuario,
    postLogin,
    postVehiculo
}