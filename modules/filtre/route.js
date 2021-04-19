const Filtre = require('./request/filtre')
const express = require('express')
const FiltreRouter = express.Router();

FiltreRouter.get('/', Filtre.getall);
FiltreRouter.get('/:id', Filtre.getById);

module.exports = FiltreRouter;