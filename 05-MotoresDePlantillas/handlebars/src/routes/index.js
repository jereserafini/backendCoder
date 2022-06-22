const { Router } = require("express");

const { postProuct,
        getProduct, 
        getHome } = require("../controllers/productsController");

const routes = Router()

routes.get("/", getHome );

routes.post("/", postProuct );

routes.get("/products", getProduct );

module.exports = routes