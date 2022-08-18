const { Router } = require('express');
const hats = require('./models/hats.js');
const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');
const tasks = require('./models/tasks.js');
const getAllPlayers = require('./models/players.js');
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
routes.post('/api/tasks/', tasks.addTask);
routes.get('/api/tasks/:difficulty', tasks.getTasksByDifficulty);
routes.get('/api/tasks/:userid/:taskid', tasks.getTaskStatusByUser);
routes.post('/api/tasks/:userid/:taskid', tasks.updateTaskStatusByUser);
routes.get('/api/currency/:userid', tasks.getCurrencyByUser);
routes.get('/api/currency/:userid', tasks.getCurrencyByUser);


// player list
routes.get('/api/players', getAllPlayers);

// routes.put('/api/users/:user_id',user.updateUserName);
routes.post('/api/users',users.checkUser);
routes.get('/api/galaxy',users.checkGalaxyName);

routes.get('/api/hats/:galaxy_id', hats.getAll);
routes.put('/api/hats/:user_id/:galaxy_id', hats.updateHat);

// insert galaxy route
routes.post('/api/galaxy/create_galaxy', galaxy.postGalaxy);


//planets
routes.get('/planets/:id', planets.getPlanetById);
routes.get('/planets/users/:user_id', planets.getUserById);


//galaxy_id update functions
routes.put('/api/user/setguid/:display_name/:g_uid', user.updateUserGUID);
routes.put('/api/user/:user_id/:galaxy_id', user.addUserToGalaxy);
routes.put('/api/user/:user_id/:galaxy_name', user.addUserToGalaxy);

routes.get('/api/galaxy/:user_id', galaxy.getUsersGalaxyID);

module.exports = routes;
