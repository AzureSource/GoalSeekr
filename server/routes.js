const { Router } = require('express');
<<<<<<< HEAD
const ship = require('./model/ship.js');
const user = require('./model/user.js');
const hats = require('./model/hats.js');
=======
const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');

>>>>>>> 043535efa1629212dbd76b0c171211028eb1d941

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);
routes.get('/api/users/:user_id/ships', user.getShips);
routes.post('/api/users/:user_id/ships', user.updateShips);
// routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

routes.get('/hats/:galaxy_id', hats.getAll);
routes.put('/hats/:user_id/:galaxy_id', hats.updateHat);


module.exports = routes;