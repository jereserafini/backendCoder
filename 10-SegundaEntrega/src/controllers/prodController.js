import { request, response } from "express";
import { ProductDao } from "../daos/index.js";

const getProducts = async ( req = request, res = response ) => {
    try {
        res.json(await ProductDao.getAllProducts())
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

const getProductsId = async ( req = request, res = response ) => {
    try {
        const {id} = req.params;

        const result = await ProductDao.getProductById(id)

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

            ProductDao.saveProduct({ title, price, url, code, description, stock })

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

        await ProductDao.updateProduct({ id, title, price, url, code, description, stock })
    
        res.json(await ProductDao.getAllProducts())
    
      } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
      }
}

const deleteProducts = async ( req = request, res = response ) => {

    try {
        const {id} = req.params;

        ProductDao.deleteProductById(id)

        res.json({"message": "Producto eliminado correctamente"})


    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }

}

export {
    getProducts,
    getProductsId,
    postProducts,
    putProducts,
    deleteProducts
}