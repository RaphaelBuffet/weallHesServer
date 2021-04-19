const Offre = require('./request/offre')
const express = require('express')
const OffreRouter = express.Router();

OffreRouter.get('/', Offre.getall);
OffreRouter.get('/:id', Offre.getById);

module.exports = OffreRouter;