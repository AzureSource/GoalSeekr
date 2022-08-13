require('dotenv').config();
const pgp = require('pg-promise')();
const { Pool } = require('pg');

// pg
const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 40,
};
const pool = new Pool(credentials);

//pgp
const cn = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 40,
};

const db = pgp(cn);

module.exports = {
  pool: pool,
  pgp: pgp,
  db: db,
};
