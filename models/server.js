//Importación de librerias
const express = require('express'),
    hbs = require('hbs'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path');

const userGet = require('../routes/usuario.routes'),
    adminGet = require('../routes/admin.routes');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.mongoURL = process.env.DB_CONNECTION;

        //Database
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    };

    connectDB() {
        console.log('Estableciendo conexion a la base de datos...');
        mongoose.connect(this.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, () => {
            console.log(`Conectado a la base de datos Mongo ${this.mongoURL}`);
        });
    }

    middlewares() {
        // Bodyparser
        this.app.use(bodyParser.json());
        // Cors
        this.app.use(cors());
        //Habilitar la carpeta parcials HBS
        hbs.registerPartials(path.resolve(__dirname, '../views/parcials'));
        //Habilitar la carpeta public 
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        this.app.set('view engine', 'hbs');

    };

    routes() {

        this.app.use('/', userGet);
        this.app.use('/', adminGet);

    };

    start() {

        this.app.listen(this.port, (err) => {
            if (err) console.log(err);

            console.log(`Escuchando el puerto del servidor http://localhost:${this.port}`);
        });

    };


};


module.exports = Server;