const { Router } = require('express');
const ship = require('./model/ship.js');
const user = require('./model/user.js');
const hats = require('./model/hats.js');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);
routes.post('/api/users/:user_id/ships', user.updateShips);


routes.get('/hats/:galaxy_id', hats.getAll);
routes.put('/hats/:user_id/:galaxy_id', hats.updateHat);


module.exports = routes;