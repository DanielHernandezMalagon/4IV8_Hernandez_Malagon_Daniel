const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0', 
    database: 'liga_futbol' 
});

module.exports = pool;