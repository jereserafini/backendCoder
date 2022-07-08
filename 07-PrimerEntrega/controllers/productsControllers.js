const { response, request } = require('express');

const ContainerProducts = require('../src/classProducts');

const products = new ContainerProducts('database/products.json')

const getProducts = async ( req = request, res = response ) => {
    try {
        res.json(await products.getAll())
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

const getProductsId = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;

        const result = await products.getById(id)

        result ? res.json(result) : res.json("{err: product not found}")

    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

const postProducts = async ( req = request, res = response) => {
    try {
        const { title, price, url, code, description, stock } = req.body;

        if (title !== '' && price !== '' && url !== '' && code !== '' && description !== '' && stock !== '') {

            products.save({ title, price, url, code, description, stock })

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

const putProducts = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;

        const { title, price, url, code, description, stock } = req.body;

        products.update({ id, title, price, url, code, description, stock })
    
        res.json(await products.getAll())
    
      } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
      }
}

const deleteProducts = async ( req = request, res = response ) => {

    try {
        const {id} = req.params;

        products.deleteById(id)

        res.json({"message": "Producto eliminado correctamente"})


    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }

}

module.exports ={
    getProducts,
    getProductsId,
    postProducts,
    putProducts,
    deleteProducts
}