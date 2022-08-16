const client = require('../../database/index.js');

module.exports = {
  getAll: async function (req, res) {

    const galaxy_id = req.query.g_id;

    try {
      const query = `SELECT * FROM public.hats WHERE galaxy_id = ${galaxy_id} `;
      const results = await client(query, []);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  },
  updateHat: async function (req, res) {

    const {u_id, g_id, hat_id} = req.query;

    //Update the hat to give it a user_id and vice versa
    //Update the planet to show the hat as chosen (unavailable)

    /* try {

        res.json(results.rows);
      } catch (error) {

        res.end().status((500));
      }
    */
  }
};