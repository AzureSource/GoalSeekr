const { Router } = require('express');
const ship = require('./model/ship.js');
const user = require('./model/user.js');
const tasks = require('./model/tasks.js');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/users/:user_id', user.findOne);

//task tracker
routes.get('/api/tasks/', tasks.getAllTasks);
routes.get('/api/tasks/:difficulty', tasks.getTasksByDifficulty);
routes.post('/api/tasks/', tasks.addTask);

module.exports = routes;