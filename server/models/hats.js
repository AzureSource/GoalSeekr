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
      const query = 'SELECT * FROM hats_user WHERE user_id = $1 AND galaxy_id = $2;';
      const results = await client(query, [u_id, g_id]);

      const query2 = `UPDATE hats_user SET hat_id = $1 WHERE user_id = $2;`;
      const query3 = `INSERT INTO hats_user (galaxy_id, user_id, hat_id) VALUES ($1, $2, $3);`;

      console.log(results.rows);
      const results2 = (results.rows.length ? await client(query2, [h_id, u_id]) : await client(query3, [g_id, u_id, h_id]));

      res.json(results2);
    } catch (error) {
      res.end().status((500));
    }

  }
};