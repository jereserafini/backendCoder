const express = require("express");
const route = require("./routes/routes");

const app = express();
const PORT = 8080;

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para recivir archivos estaticos, el dirname es para llamar ruta absoluta
app.use("/", express.static(__dirname + "/public"));

//Llamado a las rutas
app.use("/api", route);

//Escuchar en el puerto 8080
app.listen(PORT, (error) => {
  try {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
  } catch {
    console.log(error);
  }
});
