import { request, response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import LocalPass from "passport-local";
import { UserDao } from "../daos/index.js";
import bcrypt from "bcrypt";
const LocalStrategy = LocalPass.Strategy;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLogin = (req = request, res = response) => {
  try {
    if (req.isAuthenticated()) {
      console.log("Usuario logueado");
      res.sendFile(__dirname, "../public/views/index.html");
    } else {
      res.sendFile(__dirname, "../public/views/login.html");
    }
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const postLogin = (req = request, res = response) => {
  try {
    const user = req.user;
    res.sendFile(__dirname, "../public/views/index.html");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const getRegister = (req = request, res = response) => {
  try {
    res.sendFile(__dirname, "../public/views/register.html");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const postRegister = (req = request, res = response) => {
  try {
    const user = req.user;
    res.sendFile(__dirname, "../public/views/index.html");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const getLogout = (req = request, res = response) => {
  try {
    req.logout();
    res.sendFile(__dirname, "../public/views/index.html");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const getPrivateRoute = (req = request, res = response) => {
  try {
    const { user } = req;
    console.log(user);
    res.send("<h1>Ruta OK!</h1>");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await UserDao.getByUsername(username);

    if (!user || !isValidPassword(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (error) {
    console.log("Error login", error);
    done("Error login", null);
  }
});

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await UserDao.getByUsername(username);

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username,
        password: hashPassword(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.firstName,
      };

      const userCreated = await UserDao.createUser(newUser);

      done(null, userCreated);
    } catch (error) {
      console.log("Error registro", error);
      done("Error registro", null);
    }
  }
);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const checkAuthentication = (req = request, res = response, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

export {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  getPrivateRoute,
  checkAuthentication,
  loginStrategy,
  registerStrategy,
};
