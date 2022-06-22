const express = require('express')
const path = require('path')
const routes = require('./routes/index')

const PORT = 8080
const app = express()

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establece el motor de plantilla que se usa
app.set('view engine', 'ejs')

// Establece la direccion donde se encuentran las plantillas
app.set('views', path.join(__dirname, './views'))

app.use( '/', routes )

app.listen(PORT, err => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch {
        console.log(err);
    }
})