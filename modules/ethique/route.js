const Ethique = require('./request/ethique')
const express = require('express')
const EthiqueRouter = express.Router();

EthiqueRouter.get('/', Ethique.getall);
EthiqueRouter.get('/:id', Ethique.getById);

module.exports = EthiqueRouter;