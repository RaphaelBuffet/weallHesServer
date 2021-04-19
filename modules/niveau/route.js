const Niveau = require('./request/niveau')
const express = require('express')
const NiveauRouter = express.Router();

NiveauRouter.get('/', Niveau.getall);
NiveauRouter.get('/:id', Niveau.getById);

module.exports = NiveauRouter;