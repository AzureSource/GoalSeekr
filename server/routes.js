const { Router } = require('express');
const hats = require('./models/hats.js');
const ship = require('./models/ship.js');
const user = require('./models/user.js');
const users = require('./models/login.js');
const tasks = require('./models/tasks.js');
const getAllPlayers = require('./models/players.js');
const galaxy =require('./models/galaxy.js');
const chats =require('./models/chats.js');
const planets = require('./models/planets');


const routes = Router();

routes.get('/api/galaxy/:user_id', galaxy.getUsersGalaxyID);
routes.post('/api/galaxy/create_galaxy', galaxy.postGalaxy);
routes.put('/api/galaxy/begin/:user_id/:galaxy_id', galaxy.beginGame);
routes.put('/api/galaxy/turns/:user_id/:galaxy_id', galaxy.changeTurn);


//SHIPS
routes.get('/api/ships/', ship.getAll);
routes.get('/api/ships/:galaxy_id/:planet_id', ship.getShipsByPlanet);

// task tracker
routes.get('/api/tasks/', tasks.getAllTasks);
routes.post('/api/tasks/', tasks.addTask);
routes.get('/api/tasks/:difficulty', tasks.getTasksByDifficulty);
routes.get('/api/tasks/:userid/:taskid', tasks.getTaskStatusByUser);
routes.post('/api/tasks/:userid/:taskid', tasks.updateTaskStatusByUser);
routes.get('/api/currency/:userid', tasks.getCurrencyByUser);
routes.get('/api/currency/:userid', tasks.getCurrencyByUser);

//planets
routes.get('/planets/:id', planets.getPlanetById);

//chats
routes.get('/api/chats/:gal_id', chats.getChatsByGalId);
routes.post('/api/chats/:gal_id', chats.addChatByGalId);


//USER-LOGIN
routes.get('/api/users',users.checkAllUser);
routes.get('/api/galaxy', users.checkGalaxyName);
routes.post('/api/users',users.checkUser);
routes.put('/api/users/motto', users.updateMotto);
routes.put('/api/user/:user_id/:galaxy_id', user.addUserToGalaxy);
routes.put('/api/user/:user_id/:galaxy_name', user.addUserToGalaxy);
//routes.put('/api/user/setguid/:display_name/:g_uid', user.updateUserGUID);


//OBTAIN USER INFO IN GAME
routes.get('/planets/users/:user_id', user.getUserById);
routes.get('/api/users/:user_id', user.findOne);
routes.get('/api/players/:galaxy_id', getAllPlayers);
routes.get('/api/users/:user_id/ships', user.getShips);
routes.get('/api/users/:user_id/planets', user.getPlanets);
routes.get('/api/users/:user_id/ships', user.getShips);
routes.post('/api/users/:user_id/ships', user.updateShips);
routes.post('/api/users/:user_id/mission', user.doMission);
// player list


//HATS
routes.get('/api/user/hat/:userId', hats.getHatIdForUser);
routes.get('/api/hats/:galaxy_id', hats.getAll);
routes.put('/api/hats/:hat_id/:user_id/:galaxy_id', hats.updateHat);





module.exports = routes;
