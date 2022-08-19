const client = require('../../database/index.js');

module.exports = {
  getPlanetById: async function (req, res) {

    const id = req.query.id;

    try {
      const query = `SELECT * FROM planets_galaxy WHERE planet_id = ${id} `;
      const results = await client(query, []);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  },

  getUserById: async function (req, res) {

    const user_id = req.query.user_id;

    try {
      const query = `SELECT * FROM users WHERE id = ${user_id} `;
      const results = await client(query, []);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  },

};