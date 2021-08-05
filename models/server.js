//Importación de librerias
const express = require("express"),
    hbs = require("hbs"),
    cors = require("cors"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    path = require("path");

const { conectarMongoAtlas } = require("../db/config");
const { showMessage } = require("../middlewares/messages");
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
        // Bodyparser
        this.app.use(express.json());
        //Habilitar la carpeta parcials HBS
        hbs.registerPartials(path.resolve(__dirname, "../views/parcials"));
        //Habilitar la carpeta public
        this.app.use(express.static(path.resolve(__dirname, "../public")));
        //HBS
        this.app.set("view engine", "hbs");
        // CookieParser
        this.app.use(cookieParser('secret'));
        //Session
        this.app.use(session({
            secret: '3st@esmICl@V3',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                maxAge: null
            }
        }));
        //Mensaje Flash
        this.app.use(showMessage);
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
