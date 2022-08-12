require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASSWORD
});

module.exports = (text, values) => (
  pool.connect()
    .then((client) => (
      client.query(text, values)
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          return Promise.reject(new Error(err));
        })
    ))
    .catch(err => console.error(err))
);