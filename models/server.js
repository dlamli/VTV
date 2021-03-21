//Importación de librerias
const express = require('express'),
    hbs = require('hbs'),
    cors = require('cors'),
    path = require('path');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    };

    middlewares() {

        this.app.use(cors());
        //Habilitar la carpeta parcials HBS
        hbs.registerPartials(path.resolve(__dirname, '../views/parcials'));
        //Habilitar la carpeta public 
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        this.app.set('view engine', 'hbs');

    };

    routes() {
        //GET
        this.app.get('/', (req, res) => {

            res.render('index', {});

        });

        this.app.get('/login', (req, res) => {

            res.render('login', {});

        });

        this.app.get('/portfolio-details', (req, res) => {

            res.render('portfolio-details', {});

        });

        this.app.get('/admin_index', (req, res) => {

            res.render('admin_index.hbs', {
                admin: 'Admin'
            });

        });

        this.app.get('/usuario_lista', (req, res) => {

            res.render('usuario_lista', {});

        });

        this.app.get('/subasta_lista', (req, res) => {

            res.render('subasta_lista', {});

        });

        this.app.get('/usuario_index', (req, res) => {

            res.render('usuario_index.hbs', {

            });

        });
        this.app.get('/registrarVenta', (req, res) => {

            res.render('ventaForm.hbs', {});

        });

    };

    start() {

        this.app.listen(this.port, (err) => {
            if (err) console.log(err);

            console.log(`Listening server http://localhost:${process.env.PORT}`);
        });

    };


};


module.exports = Server;