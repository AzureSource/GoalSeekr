const { Router } = require('express');
const ship = require('./model/ship.js');
const user = require('./model/user.js');
const users = require('./model/login.js');


const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);
routes.post('/api/users/:user_id/ships', user.updateShips);

routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

module.exports = routes;