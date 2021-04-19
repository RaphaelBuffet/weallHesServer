const Contrat = require('./request/contrat')
const express = require('express')
const ContratRouter = express.Router();

ContratRouter.get('/', Contrat.getall);
ContratRouter.get('/:id', Contrat.getById);

module.exports = ContratRouter;