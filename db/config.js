const mongoose = require("mongoose");


const conectarMongoAtlas = async (connectionString) => {
    console.log("Estableciendo conexion a la base de datos...");
    const dbConexion = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    if (dbConexion) return 'Conectado a la base datos de Mongo Atlas';
    else throw new Error("Hubo un error en la conexion a la base de datos")
}



module.exports = {
    conectarMongoAtlas

}