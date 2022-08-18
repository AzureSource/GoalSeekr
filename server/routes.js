const { Router } = require('express');
const hats = require('./models/hats.js');
const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');
const tasks = require('./models/tasks.js');
const galaxy =require('./models/galaxy.js');
const planets = require('./models/planets');

const routes = Router();

routes.get('/api/ships/', ship.getAll);
routes.get('/api/ships/:galaxy_name/:planet_name', ship.getShipsByPlanet);
routes.get('/api/users/:user_id/ships', user.getShips);
routes.get('/api/users/:user_id', user.findOne);
routes.post('/api/users/:user_id/ships', user.updateShips);
routes.get('/api/galaxyName', user.getGalaxyName);

// task tracker
routes.get('/api/tasks/', tasks.getAllTasks);
routes.get('/api/tasks/:difficulty', tasks.getTasksByDifficulty);
routes.get('/api/tasks/currency/:userID', tasks.getCurrencyByUser);
routes.post('/api/tasks/', tasks.addTask);

// routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

routes.get('/hats/:galaxy_id', hats.getAll);
routes.put('/hats/:user_id/:galaxy_id', hats.updateHat);

// insert galaxy route
routes.post('/api/galaxy/create_galaxy', galaxy.postGalaxy);

//planets
routes.get('/planets/:id', planets.getPlanetById);
routes.get('/planets/users/:user_id', planets.getUserById);



module.exports = routes;