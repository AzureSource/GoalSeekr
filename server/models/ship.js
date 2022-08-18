// const {pool, db, pgp} = require('../../database/pgp');
const client = require('../../database');

module.exports = {
  getAll: async function (req, res) {
    try {
      const query = 'SELECT * FROM public.ships';
      const results = await client(query, []);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  },
  getShipsByPlanet: async function(req, res) {
    try {
      debugger;
      let galaxy = req.params.galaxy_name;
      let planet = req.params.planet_name;
      const query = 'SELECT * FROM getusershipsonplanetbynames($1, $2)';
      console.log('results is ', results.rows);
      const results = await client(query, [galaxy, planet]);
      res.json(results.rows);
    } catch (err) {
      res.end().status(500);
    }
  },
};


