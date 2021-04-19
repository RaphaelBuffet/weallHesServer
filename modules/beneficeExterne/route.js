const Benefice = require('./request/benefice')
const express = require('express')
const BeneficeRouter = express.Router();

BeneficeRouter.get('/', Benefice.getall);
BeneficeRouter.get('/:id', Benefice.getById);

module.exports = BeneficeRouter;