const Langue = require('./request/langue')
const express = require('express')
const LangueRouter = express.Router();

LangueRouter.get('/', Langue.getall);
LangueRouter.get('/:id', Langue.getById);

module.exports = LangueRouter;