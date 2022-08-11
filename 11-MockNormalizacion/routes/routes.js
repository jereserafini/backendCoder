import { Router } from "express";
import getProductsTest from "../controllers/controllers.js";

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

const routes = Router()

routes.get( '/products-test', getProductsTest )

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