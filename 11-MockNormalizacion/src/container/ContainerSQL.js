class ContainerSQL {

    constructor (db, table) {
        this.table = table
        this.db = db
    }

    async insertElement(element){
        try {
            await this.db(this.table).insert(element)
            console.log('Product add');
        } catch (error) {
            console.log('Error en insertar elemento', error);
            await this.db.destroy()
        }
    }

    async listAll(){
        try {
            return await this.db.select('*').from(this.table)
        } catch (error) {
            console.log('Error en el listado', error);
            await this.db.destroy()
        }
    }
}

export default ContainerSQL