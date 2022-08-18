// const {pool, db, pgp} = require('../../database/pgp');
const client = require('../../database');

module.exports = {
  getAll: async function (req, res) {
    try {
      const query = 'SELECT * FROM public.ships';
      const results = await client(query, []);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  }
};

