const fs = require('fs')

console.clear()

class Contenedor {

    constructor( path ){
        this.path = path
    }

    async save( title, price, thumbnail ){
        console.log(fs.existsSync(this.path));
        try {
            if ( fs.existsSync(this.path) ) {

                console.log('pasa por el if');

                let products = await fs.promises.readFile( this.path, 'utf-8' )

                products = JSON.parse(products)

                let id = products[products.length - 1].id + 1

                products = [...products, {id:id, title: title, price: price, thumbnail: thumbnail}]

                await fs.promises.writeFile( 'products.json', JSON.stringify(products))

            } else {
                console.log('pasa por el else');
                await fs.promises.writeFile( 'products.json', JSON.stringify([{id:1, title: title, price: price, thumbnail: thumbnail}]))
            }
            

        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
        }
    }



}

let products = new Contenedor('products.json')

products.save( 'Remera', 2500, 'img' )
products.save( 'pantalon', 2500, 'img' )
products.save( 'GORRA', 2500, 'img' )
products.save( 'jean', 2500, 'img' )
