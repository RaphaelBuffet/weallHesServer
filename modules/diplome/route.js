const Diplome = require('./request/diplome')
const express = require('express')
const DiplomeRouter = express.Router();

DiplomeRouter.get('/', Diplome.getall);
DiplomeRouter.get('/:id', Diplome.getById);

module.exports = DiplomeRouter;