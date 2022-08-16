const galaxyRouter = require('express').Router();

const {
  postGalaxy
} = require('../controllers/galaxyController');

galaxyRouter.post('galaxy/createGalaxy', postGalaxy);