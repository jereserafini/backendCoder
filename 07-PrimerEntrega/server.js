const express = require('express');
const routes = require('./routes');
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')))

app.use( '/api', routes )

app.listen(PORT, err => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch {
        console.log(err);
    }
})