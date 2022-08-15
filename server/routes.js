const { Router } = require('express');
const ship = require('./model/ship.js');
const user = require('./model/user.js');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);
routes.post('/api/users/:user_id/ships', user.updateShips);
routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users/:user_id',user.createUserName);


module.exports = routes;