const client = require('../../database');

module.exports = {

  updateUserGUID: async function (req, res) {
    const g_uid = req.params.g_uid;
    const d_name = req.params.display_name;
    try{
      const query = `UPDATE users SET googleuid = ${g_uid} WHERE username = ${d_name};`;
      const result = await client(query);
      res.json(result);
    } catch(error) {
      res.end().status(500);
    }
  },

  addUserToGalaxy: async function ( req, res ) {
    const galaxy_id = req.params.galaxy_id;
    const user_id = req.params.user_id;

    console.log(galaxy_id, user_id);
    try {
      const query1 = `UPDATE galaxies SET currentplayers = currentplayers + 1 WHERE  id = ${galaxy_id};`;
      const result1 = await client(query1);
      const query2 = `UPDATE users SET currentGalaxy = ${galaxy_id} WHERE id = ${user_id};`;
      const result2 = await client(query2);
      res.json(result1 && result2);
    } catch (error) {
      res.end().status(500);
    }
  },

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