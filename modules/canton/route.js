const Canton = require('./request/canton')
const express = require('express')
const CantonRouter = express.Router();

CantonRouter.get('/', Canton.getall);
CantonRouter.get('/:id', Canton.getById);

module.exports = CantonRouter;