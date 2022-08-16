const { Router } = require('express');
const hats = require('./models/hats.js');
const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');


const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/ships/:galaxy_name/:planet_name', ship.getShipsByPlanet);
routes.get('/api/users/:user_id', user.findOne);
routes.get('/api/users/:user_id/ships', user.getShips);
routes.post('/api/users/:user_id/ships', user.updateShips);
// routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

routes.get('/hats/:galaxy_id', hats.getAll);
routes.put('/hats/:user_id/:galaxy_id', hats.updateHat);


module.exports = routes;