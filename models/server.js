//Importación de librerias
const express = require("express"),
  hbs = require("hbs"),
  cors = require("cors"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  methodOverride = require('method-override'),
  path = require("path");
const { conectarMongoAtlas } = require("../db/config");

const usuarioRoutes = require("../routes/usuario.routes"),
  adminRoutes = require("../routes/admin.routes");

class Server {

  constructor() {
    // Express
    this.app = express();
    // Puerto
    this.port = process.env.PORT;
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
      .catch(console.log);
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Bodyparser
    this.app.use(express.json());
    // form-urlencoded
    this.app.use(express.urlencoded({ extended: false }));
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
      secret: 'keyboard cat',
      cookie: {
        maxAge: null
      },
      resave: false,
      saveUninitialized: true,
    }));
    //Mensaje Flash
    this.app.use((req, res, next) => {
      res.locals.mensaje = req.session.mensaje;
      delete req.session.mensaje;
      next();
    });
    //Method Override
    this.app.use(methodOverride('_method'));


  }

  routes() {
    // Usuario
    this.app.use("/", usuarioRoutes);
    // Admin
    this.app.use("/", adminRoutes);
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
