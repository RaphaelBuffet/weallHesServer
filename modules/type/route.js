const Type = require('./request/type')
const express = require('express')
const TypeRouter = express.Router();

TypeRouter.get('/', Type.getall);
TypeRouter.get('/:id', Type.getById);

module.exports = TypeRouter;