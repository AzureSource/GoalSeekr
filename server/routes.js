const { Router } = require('express');
const ship = require('./models/ship.js');
const user = require('./models/user.js');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);
routes.post('/api/users/:user_id/ships', user.updateShips);


module.exports = routes;