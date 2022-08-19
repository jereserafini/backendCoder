import { Router } from "express";

const routes = Router()

import { 
    getProducts,
    getProductsId,
    postProducts,
    putProducts,
    deleteProducts
} from "../controllers/prodController.js";

import { 
    deleteCart,
    deleteProductCart,
    getCart,
    postCart,
    postProductCart
} from "../controllers/cartController.js";

//Login
routes.get( '/', (req, res) => {
    req.session.name = req.body.name
    res.send('hi')
})

//Routes products

routes.get( '/products', getProducts )

routes.get( '/products/:id', getProductsId )

routes.post( '/products', postProducts )

routes.put( '/products/:id', putProducts )

routes.delete( '/products/:id', deleteProducts )

//Routes cart

routes.get( '/cart/:id/products', getCart )

routes.post( '/cart', postCart )

routes.delete( '/cart/:id', deleteCart )

routes.post( '/cart/:id/products', postProductCart )

routes.delete( '/cart/:id/products/:id_prod', deleteProductCart )

export default routes