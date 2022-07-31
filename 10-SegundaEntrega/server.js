import express from "express";
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/routes.js";

const app = express()
const PORT = process.env.PORT

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config para abrir predeterminado mi carpeta public en es6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, './public')))

app.use('/api', routes)

app.listen(PORT, err => {
    try {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    } catch {
        console.log(err);
    }
})