import admin from "firebase-admin";
import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore()
console.log('Conectado a la base de datos');


class FirebaseContainer{

    constructor(collection) {
        this.collection = db.collection(collection);
    }

    //METODOS PRODUCTOS

    //Devuelve todos los productos
    async getAllProducts(){        
        try {
            const productsSnapshot = await this.collection.get()
            const productsDoc = productsSnapshot.docs
            const response = productsDoc.map( doc => ({id: doc.id, ...doc.data()}))
            return response
        } catch (error) {
            console.log(`Error metodo "getAllProducts": ${error}`);
        }
    }
    
    //Devuelve un producto por su id
    async getProductById( id ){
        try {
            const product = this.collection.doc(id)

            const productDoc = await product.get()

            const response = productDoc.data()

            return response
            
        } catch (error) {
            console.log(`Error metodo "getProductById": ${error}`);
        }
    }

    //Inserta un producto
    async saveProduct( { title, price, url, code, description, stock } ){
        try {
            const timestamp = Date().toLocaleString("fr-FR")

            const newProduct = this.collection.doc()

            await newProduct.create({title, price, url, code, description, stock, timestamp})

            console.log('Producto guardado correctamente')
        } catch (error) {
            console.log(`Error metodo "saveProduct": ${error}`);
        }
    }

    //Actualiza un producto
    async updateProduct({ id, title, price, url, code, description, stock }){
        try {
            const product = this.collection.doc(id)

            const productUpdate = await product.update({
                    title,
                    price,
                    url,
                    code,
                    description,
                    stock
                }
            )

            console.log('Producto actualizado correctamente')

            return productUpdate

        } catch (error) {
            console.log(`Error metodo "updateProduct": ${error}`);
        }
    }

    //Elimina un producto por su id
    async deleteProductById(id){
        try {
            const product = this.collection.doc(id)

            await product.delete()

            console.log('Producto eliminado correctamente')

        } catch (error) {
            console.log(`Error metodo "deleteProductById": ${error}`);
        }
    }


    //METODOS CARRITO

    //Crea un carrito y devuelve su id
    async saveCart(){
        try {
            const productsSnapshot = await db.collection('products').get()

            const productsDoc = productsSnapshot.docs

            const response = productsDoc.map( doc => ({id: doc.id, ...doc.data()}))

            const timestamp = Date().toLocaleString("fr-FR")

            const newCart = this.collection.doc()

            await newCart.create({timestamp, products: response})

            console.log('Cart creado correctamente')
            
        } catch (error) {
            console.log(`Error metodo "saveCart": ${error}`);
        }
    }

    //Elimina carrito
    async deleteCartById(id){
        try {
            const cart = this.collection.doc(id)

            await cart.delete()

            console.log('Cart eliminado correctamente')
        } catch (error) {
            console.log(`Error metodo "deleteCartById": ${error}`);
        }
    }

    //Lista todos los productos de un carrito por su id
    async getAllProductsCart(id){
        try {
            const cart = this.collection.doc(id)

            const cartDoc = await cart.get()

            const response = cartDoc.data()

            return response.products
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

            const cart = this.collection.doc(id)

            const cartDoc = await cart.get()

            const response = cartDoc.data()

            const productsCart = response.products

            const prodFilter = productsCart.filter(prod => prod.id != id_prod)
            
            console.log(prodFilter);

            await cart.update({ products: prodFilter })

            console.log('Producto eliminado correctamente')

        } catch (error) {
            console.log(`Error metodo "deleteProdCart": ${error}`);
        }
    }

}

export default FirebaseContainer