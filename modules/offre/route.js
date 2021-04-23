const Offre = require('./request/offre')
const express = require('express')
const OffreRouter = express.Router();

OffreRouter.get('/', Offre.getall);
OffreRouter.get('/:id', Offre.getById);
OffreRouter.get('/entreprise/:id', Offre.getByEntreprise);
OffreRouter.put('/:id', Offre.modifyOffre);
OffreRouter.delete('/:id', Offre.deleteOffre);

module.exports = OffreRouter;