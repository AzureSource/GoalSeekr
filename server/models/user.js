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
  },
  getShips: async function(req, res) {
    try {
      let userId = req.params.user_id;
      const query = 'SELECT * FROM getusersships($1)';
      const results = await client(query, [userId]);
      res.json(results.rows[0]);
    } catch (err) {
      res.end().status(500);
    }
  },
  updateShips: async function (req, res) {
    try {
      let userId = req.params.user_id;
      let purchasedShips = req.body.data.ships;
      for (let i = 0; i < purchasedShips.length; i++) {
        let shipName = purchasedShips[i].name;
        let purchasedNumber = purchasedShips[i].count;
        for (let j = 0; j < purchasedNumber; j++) {
          const query = 'SELECT * FROM buyship($1, $2)';
          await client(query, [userId, shipName]);
        }
      }
      res.sendStatus(201);
    } catch (error) {
      res.end().status(500);
    }
  },
  getGalaxyName: async function (req, res) {
    try {
      const query = 'SELECT name FROM galaxies';
      const results = await client(query);
      res.json(results);
    } catch (error) {
      res.end().status(500);
    }
  }

};