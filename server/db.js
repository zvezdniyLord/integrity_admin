const Pool = require('pg').Pool;
const pool = new Pool({
    host: "localhost",
    user: 'postgres',
    port: 5432,
    password: ';',
    database: 'integrity_admin'
});

module.exports = pool;
