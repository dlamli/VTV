require('./config/config');

//Importación de librerias
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

//Habilitar la carpeta public 
app.use(express.static(path.resolve(__dirname, '../public')));

//Habilitar la carpeta parcials HBS
hbs.registerPartials(path.resolve(__dirname, '../views/parcials'));

app.set('view engine', 'hbs');

//Path
app.get('/', (req, res) => {

    res.render('index', {});

});

app.get('/login', (req, res) => {

    res.render('login', {});

});

app.get('/portfolio-details', (req, res) => {

    res.render('portfolio-details', {});

});

app.get('/admin_index', (req, res) => {

    res.render('admin_index.hbs', {
        admin: 'Admin'
    });

});

app.get('/usuario_lista', (req, res) => {

    res.render('usuario_lista', {});

});

app.get('/subasta_lista', (req, res) => {

    res.render('subasta_lista', {});

});

app.get('/usuario_index', (req, res) => {

    res.render('usuario_index.hbs', {

    });

});

//Puerto
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);

    console.log(`Listening server http://localhost:${process.env.PORT}`);
});