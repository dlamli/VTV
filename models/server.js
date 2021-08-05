//Importación de librerias
const express = require("express");
const hbs = require("hbs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const path = require("path");

const { conectarMongoAtlas } = require("../db/config");
const { generarMensaje } = require("../middlewares/messages");
const usuarioRoutes = require("../routes/usuario.routes"),
    adminRoutes = require("../routes/admin.routes");


class Server {

    constructor() {
        // Express
        this.app = express();
        // Puerto
        this.port = process.env.PORT;
        //Paths
        this.userPath = '/';
        this.adminPath = '/';
        // this.mongoURL = process.env.DB_CONNECTION;
        this.mongoCloudURL = process.env.DB_CLOUD;
        //Database
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();

    }

    connectDB() {
        conectarMongoAtlas(this.mongoCloudURL)
            .then(console.log)
            .catch(error => console.log(error));
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        //Habilitar la carpeta public
        this.app.use(express.static(path.resolve(__dirname, "../public")));
        //BodyParser
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        // CookieParser
        this.app.use(cookieParser('secret'));
        //Session
        this.app.use(session({
            secret: 'keyboard cat',
            cookie: {
                maxAge: 6000
            },
            resave: false,
            saveUninitialized: true,
        }));
        //Mensaje Flash
        this.app.use(generarMensaje);
        //HBS
        this.app.set("view engine", "hbs");
        //Habilitar la carpeta parcials HBS
        hbs.registerPartials(path.resolve(__dirname, "../views/parcials"));
        //Method Override
        this.app.use(methodOverride('_method'));
    }

    routes() {
        // Usuario
        this.app.use(this.userPath, usuarioRoutes);
        // Admin
        this.app.use(this.adminPath, adminRoutes);
    }

    start() {
        // Inicio del servidor
        this.app.listen(this.port, (err) => {
            if (err) console.log(err);
            console.log(
                `Escuchando el puerto del servidor http://localhost:${this.port}`
            );
        });
    }
}

module.exports = Server;
