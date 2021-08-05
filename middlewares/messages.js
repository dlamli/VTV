const { request, response } = require('express');

const generarMensaje = (req = request, res = response, next) => {
    res.locals.mensaje = req.session.mensaje;
    delete req.session.mensaje;
    next();
}

module.exports = {
    generarMensaje,
}