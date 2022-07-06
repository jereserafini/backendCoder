const { Router } = require("express");

const { 
    getProducts,
    postProducts, 
    putProducts,
    deleteProducts,
    getProductsId
} = require("../controllers/productsControllers");

const { 
    getCart, 
    postCart,
    deleteCart,
    postProductCart,
    deleteProductCart
} = require("../controllers/cartControllers");

const routes = Router()

const admin = false

const isAdmin = ( req, res, next ) => {
    if (admin) {
        return next()
    } else {
        res.json({ error: 'Not admin', description: `rute ${req.path} method ${req.method} unauthorized`})
    }
}

//Routes products

routes.get( '/products', getProducts )

routes.get( '/products/:id', getProductsId )

routes.post( '/products', isAdmin, postProducts )

routes.put( '/products/:id', isAdmin, putProducts )

routes.delete( '/products/:id', isAdmin, deleteProducts )

//Routes cart

routes.get( '/cart/:id/products', getCart )

routes.post( '/cart', postCart )

routes.delete( '/cart/:id', deleteCart )

routes.post( '/cart/:id/products', postProductCart )

routes.delete( '/cart/:id/products/:id_prod', deleteProductCart )

module.exports = routes