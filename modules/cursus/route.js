const Cursus = require('./request/cursus')
const express = require('express')
const CursusRouter = express.Router();

CursusRouter.get('/', Cursus.getall);
CursusRouter.get('/:id', Cursus.getById);

module.exports = CursusRouter;