import { request, response } from "express";
import { CartDao } from "../daos/index.js";

//Crea un carrito y devuelve su id
const postCart = async ( req = request, res = response ) => {
    try {
        res.json( await CartDao.saveCart())
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

//Elimina carrito
const deleteCart = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;
        
        await CartDao.deleteCartById(id)

        res.json({"message": "Carrito eliminado correctamente"})
        
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

//Lista todos los productos de un carrito por su id
const getCart = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;
        res.json(await CartDao.getAllProductsCart(id))
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }

}

//Agrega productos al carrito por su id
const postProductCart = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;

        const { title, price, url, code, description, stock } = req.body;

        if (title !== '' && price !== '' && url !== '' && code !== '' && description !== '' && stock !== '') {

            await CartDao.postProdCart({ id, title, price, url, code, description, stock })
            
            res.json({"message": "Producto agregado correctamente"})


        } else {
            console.log('Complete all camps')
        }
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

//Elimina un producto por el id del carrito y del producto
const deleteProductCart = async ( req = request, res = response ) => {

    try {
        const {id, id_prod} = req.params;
        
        await CartDao.deleteProdCart(id, id_prod)

        res.json({"message": "Producto eliminado correctamente"})

        
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }

}

export {
    postCart,
    deleteCart,
    getCart,
    postProductCart,
    deleteProductCart
}