const express = require('express')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const { Server: IOServer } = require('socket.io')

const PORT = 8080
const app = express()

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')))

// app.use( '/', routes )

const products = []
const messages = []

//Guardamos el servidor en una constante
const expressServer = app.listen(PORT, err => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch {
        console.log(err);
    }
})

//Iniciamos un nuevo servidor en socket.io
const io = new IOServer(expressServer)

//classChat
const Contenedor = require('./classChat')
const chat = new Contenedor('chats.json')

//Escuchando las conexiones
io.on('connection', socket => {
    console.log(`Se conecto el cliente ${socket.id}`)

    //Messages
    socket.emit('server:messages', messages)
    
    socket.on('client:message', (messageInfo) => {
        messages.push(messageInfo)
        console.log(messages);
        chat.save(messages)
        io.emit('server:messages', messages)
    })

    //Products
    socket.emit('server:products', products)
    
    socket.on('client:product', (product) => {
        const id = uuidv4()
        const productId = {id, ...product}
        products.push(productId)
        io.emit('server:products', products)
    })
})