const Secteur = require('./request/secteur')
const express = require('express')
const SecteurRouter = express.Router();

SecteurRouter.get('/', Secteur.getall);
SecteurRouter.get('/:id', Secteur.getById);

module.exports = SecteurRouter;