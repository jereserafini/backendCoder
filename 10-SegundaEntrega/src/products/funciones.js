import { databaseConnectionMariaDB, databaseConnectionSqlite } from "../database/db.js"


export const createTableProducts = async () => {
    try {
        await databaseConnectionMariaDB.schema.dropTableIfExists('products')

        await databaseConnectionMariaDB.schema.createTable( 'products', productTable => {
            productTable.increments('id').primary()
            productTable.string('title').notNullable()
            productTable.integer('price').notNullable()
            productTable.string('url').notNullable()
        })

        console.log('Table created');

        await databaseConnectionMariaDB.destroy()

    } catch (error) {
        console.log('Error en el creado de tabla', error);
        await databaseConnectionMariaDB.destroy()
    }
}

export const createTableMsg = async () => {
    try {
        await databaseConnectionSqlite.schema.dropTableIfExists('messages')

        await databaseConnectionSqlite.schema.createTable( 'messages', messageTable => {
            messageTable.increments('id').primary()
            messageTable.string('email').notNullable()
            messageTable.string('message').notNullable()
            messageTable.string('date').notNullable()
        })

        console.log('Table created');

        await databaseConnectionSqlite.destroy()

    } catch (error) {
        console.log('Error en el creado de tabla', error);
        await databaseConnectionSqlite.destroy()
    }
}