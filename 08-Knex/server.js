import express from "express";
import 'dotenv/config'
import path from "path";
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import ContainerSQL from "./src/container/ContainerSQL.js";
import { databaseConnectionMariaDB, databaseConnectionSqlite } from "./src/database/db.js";

const app = express()
const PORT = process.env.PORT

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config para abrir predeterminado mi carpeta public en es6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, './public')))

//Guardamos el servidor en una constante
const expressServer = app.listen(PORT, err => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch {
        console.log('Error en el listen', err);
    }
})

//Iniciamos un nuevo servidor en socket.io
const io = new IOServer(expressServer)

//Instancio Api
const products = new ContainerSQL(databaseConnectionMariaDB, 'products')
const messages = new ContainerSQL(databaseConnectionSqlite, 'messages')

//Escuchando las conexiones
io.on('connection', async socket => {
    console.log(`Se conecto el cliente ${socket.id}`)

    //Messages
    socket.emit('server:messages', await messages.listAll())
    
    socket.on('client:message', async (messageInfo) => {
        await messages.insertElement(messageInfo)
        io.emit('server:messages', await messages.listAll())
    })

    //Products
    socket.emit('server:products', await products.listAll())
    
    socket.on('client:product', async (product) => {
        await products.insertElement(product)
        io.emit('server:products', await products.listAll())
    })
})