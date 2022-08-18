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
  },
  doMission: async function (req, res) {
    try {
      let userId = req.params.user_id;
      let type = req.body.data.type;
      if (type === 'scout') {
        let targetPlanet = req.body.data.targetPlanet;
        const query = 'SELECT * FROM discoverplanet($1, $2)';
        await client(query, [userId, targetPlanet]);
      }
      if (type === 'colony') {
        let targetPlanet = req.body.data.targetPlanet;
        const query = 'SELECT * FROM colonizeplanet($1, $2)';
        await client(query, [userId, targetPlanet]);
      }
      res.sendStatus(201);
    } catch (err) {
      res.end().status(500);
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