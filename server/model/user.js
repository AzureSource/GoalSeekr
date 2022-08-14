const client = require('../../database');

module.exports = {
  findOne: async function (req, res) {
    try {
      const query = 'SELECT * FROM public.users WHERE id = $1';
      const results = await client(query, [req.params.user_id]);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  }
};