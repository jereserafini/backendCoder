const fs = require('fs')

class Contenedor {

    constructor( path ){
        this.path = path
    }

    async save( messages ){
        try {
            await fs.promises.writeFile( this.path, JSON.stringify(messages) )            
        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
        }
    }
}

module.exports = Contenedor;

// const products = new Contenedor('products.json')

// products.save( 'Remera', 2500, 'img1' )
// products.save( 'pantalon', 2500, 'img2' )
// products.save( 'GORRA', 2500, 'img3' )
// products.save( 'jean', 2500, 'img4' )

// products.getById( 2 )
// products.getAll()
// products.deleteById( 2 )
// products.deleteAll()