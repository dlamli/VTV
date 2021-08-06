const { request, response } = require('express');

const tipoUsuario = require("../models/tipoUsuario"),
    Usuario = require("../models/usuario"),
    Vehiculo = require("../models/vehiculo"),
    Venta = require("../models/venta");

const getAdmin = async (req = request, res = response) => {
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
}

const getListaUsuario = async (req = request, res = response) => {
    await Usuario.find({ tipoUsuario: 0 }, (err, dato) => {
        if (err) { res.json(err) }
        else {
            res.render("usuario_lista", { usuarioDB: dato });
        }
    });
}

const getSubasta = (req = request, res = response) => {
    res.render("subasta_lista", {});
}

const getVehiculo = async (req = request, res = response) => {
    res.render('registroVehiculo');
}

const postVehiculo = async (req = request, res = response) => {
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
}

const postVehiculoId = async (req = request, res = response) => {
    try {
        const getVehiculoId = await Vehiculo.findById({ _id: req.body.id });

        res.json(getVehiculoId.img);

    } catch (error) {
        res.json(error);
    }
}

const postUsuarioId = async (req = request, res = response) => {
    try {
        const getUsuarioId = await Usuario.findById(req.params.id);
        res.json({
            msg: 'Usuario insertado',
            getUsuarioId
        });
    } catch (error) {
        res.json({
            msg: error
        });
    }

}

const postRol = async (req = request, res = response) => {
    try {
        let { id, rol } = req.body;
        const registrarRole = new tipoUsuario({
            _id: id,
            rol
        });

        await registrarRole.save();

        res.json({
            registrarRole
        })
    } catch (error) {
        res.json({
            error
        });
    }
}

const deleteUsuario = async (req = request, res = response) => {
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
}

const putUsuario = async (req = request, res = response) => {
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
}




module.exports = {
    getAdmin,
    getListaUsuario,
    getSubasta,
    getVehiculo,
    postVehiculo,
    postVehiculoId,
    putUsuario,
    deleteUsuario,
    postRol,
    postUsuarioId,
}