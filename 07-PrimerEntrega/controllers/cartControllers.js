const { response, request } = require('express')
const ContainerCart = require('../src/classCart')
const ContainerProducts = require('../src/classProducts')

const cart = new ContainerCart('database/cart.json')
const products = new ContainerProducts('database/products.json')


//Crea un carrito y devuelve su id
const postCart = async ( req = request, res = response ) => {
    try {
        res.json( await cart.save())
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
        
        cart.deleteById(id)
        
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
        res.json(await cart.getAllProducts(id))
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }

}

//Agrega productos al carrito por su id
const postProductCart = async ( req = request, res = response ) => {

    

}

//Elimina un producto por el id del carrito y del producto
const deleteProductCart = async ( req = request, res = response ) => {

    

}

module.exports = {
    getCart,
    postCart,
    deleteCart,
    postProductCart,
    deleteProductCart
}