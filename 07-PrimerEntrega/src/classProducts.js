const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

class ContainerProducts {

    constructor( path ){
        this.path = path
    }

    async getAll(){        
        try {
            const products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))
            return products
        } catch (error) {
            console.log(`Error metodo "getAll": ${error}`);
        }
    }
    
    async getById( id ){
        try {
            const products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            const product = products.find(prod => prod.id == id)

            return product
            
        } catch (error) {
            console.log(`Error metodo "getById": ${error}`);
        }
    }

    async save( { title, price, url, code, description, stock } ){
        try {
            const id = uuidv4()
            const timestamp = Date().toLocaleString("fr-FR")
            console.log(timestamp);
            let products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            products.push({ id, title, price, url, code, description, stock })

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto guardado exitosamente', id);

            return id
            
        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
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


    async deleteById(id){
        try {
            let products = JSON.parse(await fs.promises.readFile( this.path, 'utf-8' ))

            products = products.filter(prod => prod.id !== id)

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto eliminado correctamente', products)
            
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

module.exports = ContainerProducts;