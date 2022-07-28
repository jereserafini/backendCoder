import knex from 'knex'

const MariaDB = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'database_products'
    },
    pool: { min: 0, max: 7 }
}

const Sqlite3 = {
  client: 'sqlite3',
  connection: { filename: './dbChat/mydb.sqlite' },
  useNullAsDefault: true
}

export const databaseConnectionMariaDB = knex(MariaDB)

export const databaseConnectionSqlite = knex(Sqlite3)
