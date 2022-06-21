const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const routes = require('./routes/index')

const PORT = 8080
const app = express()

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join( __dirname, './views/layout/main.hbs' ),
    layoutsDir: path.join( __dirname, './views/layout' ),
    partialsDir: path.join( __dirname, './views/partials' )
}))

// Establece el motor de plantilla que se usa
app.set('view engine', 'hbs')

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