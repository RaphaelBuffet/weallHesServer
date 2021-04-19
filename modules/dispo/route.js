const Dispo = require('./request/dispo')
const express = require('express')
const DispoRouter = express.Router();

DispoRouter.get('/', Dispo.getall);
DispoRouter.get('/:id', Dispo.getById);

module.exports = DispoRouter;