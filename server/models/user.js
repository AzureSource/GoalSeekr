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
      const query2 = `UPDATE users SET currentGalaxy = ${galaxy_id} WHERE id = ${user_id};`;
      const result1 = await client(query2);
      const query1 = `UPDATE galaxies SET currentplayers = (SELECT count(*) FROM users WHERE currentGalaxy = ${galaxy_id}) WHERE  id = ${galaxy_id};`;
      const result2 = await client(query1);
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
      let planetId = req.body.data.planetId;
      for (let i = 0; i < purchasedShips.length; i++) {
        let shipName = purchasedShips[i].name;
        let purchasedNumber = purchasedShips[i].count;
        for (let j = 0; j < purchasedNumber; j++) {
          const query = 'SELECT * FROM buyship($1, $2, $3)';
          await client(query, [userId, planetId, shipName]);
        }
      }
      res.sendStatus(201);
    } catch (error) {
      res.end().status(500);
    }
  },
  doMission: async function (req, res) {
    try {
      let results = [];
      let userId = req.params.user_id;
      let type = req.body.data.type;
      let targetId = req.body.data.targetPlanetId;
      // debugger;
      if (type === 'scout') {
        let targetPlanet = req.body.data.targetPlanet;
        const query = 'SELECT * FROM discoverplanet($1, $2)';
        await client(query, [userId, targetPlanet]);
        res.sendStatus(201);
      } else if (type === 'mission') {
        let shipIds = req.body.data.shipIds;
        const query = 'SELECT * FROM attackandcolonizeplanet($1, $2, $3)';
        const viewResult = await client(query, [userId, targetId, shipIds]);
        results.push(viewResult.rows[0]);
        console.log('results', results);
        res.json(results);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getPlanets: async function (req, res) {
    try {
      let userId = req.params.user_id;
      const query1 = `SELECT planet_id FROM public.planets_galaxy
      WHERE colonizedby = $1`;
      const colonizedPlanetsDB = await client(query1, [userId]);
      console.log('colonizedPlanets is ', colonizedPlanetsDB.rows);
      const query2 = `SELECT planet_id FROM public.planets_galaxy
      WHERE $1 = ANY (discoveredby)`;
      const scoutedPlanetsDB = await client(query2, [userId]);
      console.log('scoutedPlanets is ', scoutedPlanetsDB.rows);
      var results = {};
      results.colonizedPlanets = [];
      results.scoutedPlanets = [];
      for (let i = 0; i < colonizedPlanetsDB.rows.length; i++) {
        results.colonizedPlanets.push(colonizedPlanetsDB.rows[i].planet_id);
      }
      for (let i = 0; i < scoutedPlanetsDB.rows.length; i++) {
        results.scoutedPlanets.push(scoutedPlanetsDB.rows[i].planet_id);
      }
      res.json(results);
    } catch (err) {
      res.end().status(500);
    }
  }
};