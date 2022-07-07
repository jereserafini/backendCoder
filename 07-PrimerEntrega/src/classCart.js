const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

class ContainerCart {

    constructor( path ){
        this.path = path
    }

    //Crea un carrito y devuelve su id
    async save(){
        try {
            const id = uuidv4()
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
    async deleteById(id){
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
    async getAllProducts(id){        
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

    

    //Elimina un producto por el id del carrito y del producto


    async getById( id ){
        try {
            const products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            const product = products.find(prod => prod.id == id)

            return product
            
        } catch (error) {
            console.log(`Error metodo "getById": ${error}`);
        }
    }


    async update({ id, title, price, url, code, description, stock }){
        try {
            const products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            products.map((prod) => {
                if (prod.id === id) {
                    (prod.title = title),
                    (prod.price = price),
                    (prod.url = url),
                    (prod.code = code),
                    (prod.description = description),
                    (prod.stock = stock)
                }
              });

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto actualizado correctamente')

            return products
        } catch (error) {
            console.log(`Error metodo "deleteById": ${error}`);
        }
    }



    // async deleteAll(){
    //     try {
    //         await fs.promises.writeFile( this.path, '[]' )
    //         console.log('Base de datos eliminada correctamente');
    //     } catch (error) {
    //         console.log(`Error metodo "deleteAll": ${error}`);
    //     }
    // }

}

module.exports = ContainerCart;