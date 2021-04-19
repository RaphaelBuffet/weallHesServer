const Localite = require('./request/localite')
const express = require('express')
const LocaliteRouter = express.Router();

LocaliteRouter.get('/', Localite.getall);
LocaliteRouter.get('/:id', Localite.getById);

module.exports = LocaliteRouter;