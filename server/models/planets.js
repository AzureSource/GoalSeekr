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



};