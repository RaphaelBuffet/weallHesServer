const Taux = require('./request/taux')
const express = require('express')
const TauxRouter = express.Router();

TauxRouter.get('/', Taux.getall);
TauxRouter.get('/:id', Taux.getById);

module.exports = TauxRouter;