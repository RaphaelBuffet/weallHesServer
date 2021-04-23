const Filtre = require('./request/filtre')
const express = require('express')
const FiltreRouter = express.Router();

FiltreRouter.get('/', Filtre.getall);
FiltreRouter.get('/:id', Filtre.getById);
FiltreRouter.get('/postulant/:id', Filtre.getAllFiltrePostulant);
FiltreRouter.get('/offre/:id', Filtre.getAllFiltreOffre);
FiltreRouter.put('/postulant/:id', Filtre.updtaefiltrePostulant);
FiltreRouter.put('/offre/:id', Filtre.updtaefiltreOffre);

module.exports = FiltreRouter;