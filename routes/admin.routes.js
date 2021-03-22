const { Router } = require('express'),
    router = Router();


router.get('/admin_index', (req, res) => {

    res.render('admin_index.hbs', {
        admin: 'Admin'
    });

});

router.get('/usuario_lista', (req, res) => {

    res.render('usuario_lista', {});

});

router.get('/subasta_lista', (req, res) => {

    res.render('subasta_lista', {});

});

module.exports = router;