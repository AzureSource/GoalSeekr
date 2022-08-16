const galaxyRouter = require('express').Router();

const {
  postGalaxy
} = require('../controllers/galaxyController');

galaxyRouter.post('/createGalaxy', postGalaxy);