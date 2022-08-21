import { Router } from "express";

const routes = Router();

import {
  getProducts,
  getProductsId,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/prodController.js";

import {
  deleteCart,
  deleteProductCart,
  getCart,
  postCart,
  postProductCart,
} from "../controllers/cartController.js";
import passport from "passport";
import {
  checkAuthentication,
  getLogin,
  getLogout,
  getPrivateRoute,
  getRegister,
  postLogin,
  postRegister,
} from "../controllers/sessionController.js";

//Sesion

// Login
routes.get("/login", getLogin);

routes.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failsignup" }),
  postLogin
);

// Register
routes.get("/register", getRegister);

routes.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  postRegister
);

//Private route
routes.get("/private-route", checkAuthentication, getPrivateRoute);

// Logout
routes.get("/logout", getLogout);

//Routes products

routes.get("/products", getProducts);

routes.get("/products/:id", getProductsId);

routes.post("/products", postProducts);

routes.put("/products/:id", putProducts);

routes.delete("/products/:id", deleteProducts);

//Routes cart

routes.get("/cart/:id/products", getCart);

routes.post("/cart", postCart);

routes.delete("/cart/:id", deleteCart);

routes.post("/cart/:id/products", postProductCart);

routes.delete("/cart/:id/products/:id_prod", deleteProductCart);

export default routes;