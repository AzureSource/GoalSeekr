const client = require('../../database/index.js');

module.exports = {
  getAll: async function (req, res) {

    const galaxy_id = req.params.galaxy_id;

    try {
      const query = `SELECT hat_id FROM hats_user WHERE galaxy_id = ${galaxy_id} `;
      const results = await client(query, []);
      res.json(results);
    } catch (error) {
      res.end().status(500);
    }
  },
  updateHat: async function (req, res) {

    const u_id = req.params.user_id;
    const g_id = req.params.galaxy_id;
    const h_id = req.params.hat_id;

    // First Select to see if user exists on table, if so update, otherwise, do insert

    try {
      const query = `INSERT INTO hats_user (galaxy_id, user_id, hat_id) VALUES ($1, $2, $3);`;
      const results = await client(query, [g_id, u_id, h_id]);
      res.json(results.rows);
    } catch (error) {

      res.end().status((500));
    }

  }
};