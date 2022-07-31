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
            console.log(`Error metodo "getAll": ${error}`);
        }
    }
    
    //Devuelve un producto por su id
    async getProductById( id ){
        try {
            const product = await this.collection.findById(id)

            return product
            
        } catch (error) {
            console.log(`Error metodo "getById": ${error}`);
        }
    }

    //Inserta un producto
    async saveProduct( { title, price, url, code, description, stock } ){
        try {
            const timestamp = Date().toLocaleString("fr-FR")

            const product = await this.collection.insertMany({title, price, url, code, description, stock, timestamp})

            return product[0]._id
            
        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
        }
    }

    //Actualiza un producto
    async updateProduct({ id, title, price, url, code, description, stock }){
        try {
            const product = await this.collection.updateOne({"__id": id},{
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
            console.log(`Error metodo "deleteById": ${error}`);
        }
    }

    //Elimina un producto por su id
    async deleteProductById(id){
        try {
            const product = await this.collection.deleteOne({"__id": id})

            console.log('Producto eliminado correctamente', product)
            
            return products
        } catch (error) {
            console.log(`Error metodo "deleteById": ${error}`);
        }
    }


    //METODOS CARRITO

    //Crea un carrito y devuelve su id
    async saveCart(){
        try {
            const timestamp = Date().toLocaleString("fr-FR")

            const carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            const products = JSON.parse(await fs.promises.readFile( 'database/products.json', 'utf-8' ))

            carts.push({ id, timestamp, products })
            
            await fs.promises.writeFile( this.path, JSON.stringify(carts) )
            
            console.log('Cart guardado exitosamente', id);

            return id
            
        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
        }
    }

    //Elimina carrito
    async deleteCartById(id){
        try {
            let carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            carts = carts.filter(cart => cart.id !== id)

            await fs.promises.writeFile( this.path, JSON.stringify(carts) )

            console.log('Cart eliminado correctamente', carts)

        } catch (error) {
            console.log(`Error metodo "deleteById": ${error}`);
        }
    }

    //Lista todos los productos de un carrito por su id
    async getAllProductsCart(id){        
        try {
            
            const carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            const cart = carts.find( x => x.id == id )

            const products = cart.products

            return products
        } catch (error) {
            console.log(`Error metodo "getAll": ${error}`);
        }
    }

    //Agrega productos al carrito por su id
        async postProdCart({ id, title, price, url, code, description, stock }){
        try {
            const carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))
            const idProd = uuidv4()
            const timestamp = Date().toLocaleString("fr-FR")
            carts.map((cart) => {
                if (cart.id === id) {
                    cart.products.push({ id: idProd, title, timestamp, price, url, code, description, stock })
                }
            });

            await fs.promises.writeFile( this.path, JSON.stringify(carts) )

            console.log('Producto agregado al carrito correctamente')

        } catch (error) {
            console.log(`Error metodo "postProdCart": ${error}`);
        }
    }
    

    //Elimina un producto por el id del carrito y del producto
    async deleteProdCart(id, id_prod){
        try {
            let carts = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            carts.map((cart) => {
                if (cart.id === id) {
                    cart.products = cart.products.filter(prod => prod.id !== id_prod)
                }
            });

            await fs.promises.writeFile( this.path, JSON.stringify(carts) )

            console.log('Producto eliminado correctamente')

        } catch (error) {
            console.log(`Error metodo "deleteProdCart": ${error}`);
        }
    }

}

export default MongoContainer