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
      let galaxyId = req.params.galaxy_id;
      let planetId = req.params.planet_id;
      console.log('ids', galaxyId);
      console.log('iddsss', planetId);
      const query = 'SELECT * FROM getusershipsonplanet($1, $2)';
      const results = await client(query, [galaxyId, planetId]);
      res.json(results.rows);
    } catch (err) {
      res.end().status(500);
    }
  },
};


