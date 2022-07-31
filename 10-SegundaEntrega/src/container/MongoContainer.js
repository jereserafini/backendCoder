import mongoose from "mongoose"
import config from "./config.js"

await mongoose.connect(config.mongo.connection)
console.log('Conectado a la base de datos');

class MongoContainer{

    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    //METODOS PRODUCTOS

    //Devuelve todos los productos
    async getAllProducts(){        
        try {
            const products = await this.collection.find({})
            return products
        } catch (error) {
            console.log(`Error metodo "getAllProducts": ${error}`);
        }
    }
    
    //Devuelve un producto por su id
    async getProductById( id ){
        try {
            const product = await this.collection.findById(id)

            return product
            
        } catch (error) {
            console.log(`Error metodo "getProductById": ${error}`);
        }
    }

    //Inserta un producto
    async saveProduct( { title, price, url, code, description, stock } ){
        try {
            const timestamp = Date().toLocaleString("fr-FR")

            const product = await this.collection.insertMany({title, price, url, code, description, stock, timestamp})

            console.log('Producto guardado correctamente')

            return product[0]._id
            
        } catch (error) {
            console.log(`Error metodo "saveProduct": ${error}`);
        }
    }

    //Actualiza un producto
    async updateProduct({ id, title, price, url, code, description, stock }){
        try {
            const product = await this.collection.updateOne({"_id": id},{
                $set: {
                    title,
                    price,
                    url,
                    code,
                    description,
                    stock
                }
            })

            console.log('Producto actualizado correctamente')

            return product

        } catch (error) {
            console.log(`Error metodo "updateProduct": ${error}`);
        }
    }

    //Elimina un producto por su id
    async deleteProductById(id){
        try {
            const product = await this.collection.deleteOne({"_id": id})

            console.log('Producto eliminado correctamente')

            return product

        } catch (error) {
            console.log(`Error metodo "deleteProductById": ${error}`);
        }
    }


    //METODOS CARRITO

    //Crea un carrito y devuelve su id
    async saveCart(){
        try {
            const timestamp = Date().toLocaleString("fr-FR")

            const products = await mongoose.model('products').find({}, {__v: 0})

            const cart = await this.collection.insertMany({timestamp, products})

            console.log('Cart creado correctamente')

            return cart
            
        } catch (error) {
            console.log(`Error metodo "saveCart": ${error}`);
        }
    }

    //Elimina carrito
    async deleteCartById(id){
        try {
            const cart = await this.collection.deleteOne({"_id": id})

            console.log('Cart eliminado correctamente')

            return cart

        } catch (error) {
            console.log(`Error metodo "deleteCartById": ${error}`);
        }
    }

    //Lista todos los productos de un carrito por su id
    async getAllProductsCart(id){
        try {
            const cart = await this.collection.findById(id)

            const products = cart.products

            return products
        } catch (error) {
            console.log(`Error metodo "getAllProductsCart": ${error}`);
        }
    }

    //------------------NO TENGO IDEA DE COMO HACER---------------------

    //Agrega productos al carrito por su id
    //     async postProdCart({ id, title, price, url, code, description, stock }){
    //     try {

    //         const cart = await this.collection.findById(id)

    //         const timestamp = Date().toLocaleString("fr-FR")

    //         const product = await this.collection.insertMany({ id: ObjectId(), title, price, url, code, description, stock, timestamp})

    //         const carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))


    //         console.log('Producto agregado al carrito correctamente')

    //     } catch (error) {
    //         console.log(`Error metodo "postProdCart": ${error}`);
    //     }
    // }
    

    //Elimina un producto por el id del carrito y del producto
    async deleteProdCart(id, id_prod){
        try {
            const cart = await this.collection.findById(id)

            const prodFilter = cart.products.filter(prod => prod._id != id_prod)

            await this.collection.updateOne({"_id": id},{
                $set: { products: prodFilter }
            })

            console.log('Producto eliminado correctamente')

        } catch (error) {
            console.log(`Error metodo "deleteProdCart": ${error}`);
        }
    }

}

export default MongoContainer