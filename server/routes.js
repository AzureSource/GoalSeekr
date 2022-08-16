const { Router } = require('express');

const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');
const tasks = require('./model/tasks.js');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);

// task tracker
routes.get('/api/tasks/', tasks.getAllTasks);
routes.get('/api/tasks/:difficulty', tasks.getTasksByDifficulty);
routes.get('/api/tasks/currency/:userID', tasks.getCurrencyByUser);
routes.post('/api/tasks/', tasks.addTask);
routes.post('/api/users/:user_id/ships', user.updateShips);

// routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

module.exports = routes;