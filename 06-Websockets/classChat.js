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