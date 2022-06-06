const express = require('express')
const products = require('./app')
const app = express()
const PORT = 8081

app.get('/', (req,res) => {

    res.send(`<h1>Bienvenidos al himalaya</h1>`)
})


app.get('/products', (req,res) => {

    products.getAll()
        .then(resp => res.send(resp))

})

app.get('/productsRnd', (req,res) => {

    products.prodRnd()
        .then(resp => res.send(resp))

})


const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
})

server.on( "error", error => console.log(`Error en el servidor: ${error}`))