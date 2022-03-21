const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRES_PASS,
  host: "localhost",
  port: 5432,
  database: "noteapp",
});

module.exports = pool;
