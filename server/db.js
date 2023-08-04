const Pool = require('pg').Pool;

const credentials = {
    user: "rayani1203",
    host: "localhost",
    database: "invest",
    password: "postgres123",
    port: 5432,
};

const pool = new Pool(credentials);
module.exports = pool;