//Importación de librerias
const express = require("express"),
  hbs = require("hbs"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path");

const usuarioRoutes = require("../routes/usuario.routes"),
  adminRoutes = require("../routes/admin.routes");
  

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.mongoCloud = process.env.DB_CLOUD;

    //Database
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  connectDB() {
    console.log("Estableciendo conexion a la base de datos...");
    mongoose.connect(
      this.mongoCloud,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(console.log('Conectado en la base de datos'))
      .catch((err) => console.log(err));
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Bodyparser
    this.app.use(bodyParser.json());
    // form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    //Habilitar la carpeta parcials HBS
    hbs.registerPartials(path.resolve(__dirname, "../views/parcials"));
    //Habilitar la carpeta public
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    //HBS
    this.app.set("view engine", "hbs");

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
