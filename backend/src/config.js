
const PORT = process.env.PORT || 4000;
const DB_USER = process.env.DB_HOST || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'pg123';
const DB_NAME = process.env.DB_PASSWORD || 'tasksdb';
const DB_PORT = process.env.DB_PASSWORD || '5432';

module.exports = {
    db : {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME
    },
    PORT
}