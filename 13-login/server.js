import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {
  loginStrategy,
  registerStrategy,
} from "./src/controllers/sessionController.js";
import { UserDao } from "./src/daos/index.js";

const app = express();
const PORT = process.env.PORT;

//Middleware necesario para tomar datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config para abrir predeterminado mi carpeta public en es6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./public")));

//Config de mongo para la session
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Middleware para usar cookies
app.use(cookieParser());

//Config para sessions
app.use(
  session({
    secret: "Coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, //para que se reinicie el tiempo con cada request
    cookie: {
      maxAge: 600000,
    },
  })
);

//Config session
app.use(passport.initialize());
app.use(passport.session());

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserDao.getProductById(id, done);
});

app.use("/api", routes);

app.listen(PORT, (err) => {
  try {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  } catch {
    console.log(err);
  }
});
