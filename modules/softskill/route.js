const Softskill = require('./request/softskill')
const express = require('express')
const SoftskillRouter = express.Router();

SoftskillRouter.get('/', Softskill.getall);
SoftskillRouter.get('/:id', Softskill.getById);

module.exports = SoftskillRouter;