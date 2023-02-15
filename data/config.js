const mysql = require('mysql');

// Set database connection credentials
const config = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
    authKey: process.env.AUTH_KEY,
    connectionLimit: 10
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;

