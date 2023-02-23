
const {config} = require('dotenv')
config()


const PORT = parseInt(process.env.PORT) || process.env.DEFAULT_PORT;
const DB_USER = process.env.DB_USER || process.env.DEFAULT_USER ;
const DB_HOST = process.env.DB_HOST || process.env.DEFAULT_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DEFAULT_PASSWORD;
const DB_NAME = process.env.DB_NAME || process.env.DEFAULT_NAME;
const DB_PORT = process.env.DB_PORT|| process.env.DEFAULT_DB_PORT;
const DB_URL = `postgresql://${ DB_USER }:${DB_PASSWORD}@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`

module.exports = {
    db : {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        database_url: DB_URL
    },
    PORT
}