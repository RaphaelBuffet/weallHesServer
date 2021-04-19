const Salaire = require('./request/salaire')
const express = require('express')
const SalaireRouter = express.Router();

SalaireRouter.get('/', Salaire.getall);
SalaireRouter.get('/:id', Salaire.getById);

module.exports = SalaireRouter;