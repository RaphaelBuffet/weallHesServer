const Softskill = require('./request/softskill')
const express = require('express')
const SoftskillRouter = express.Router();

SoftskillRouter.get('/', Softskill.getall);
SoftskillRouter.get('/:id', Softskill.getById);
SoftskillRouter.get('/postulant/:id', Softskill.getByPostulant);
SoftskillRouter.put('/postulant/:id_postulant/:id_softskill', Softskill.modifySoftskill);

module.exports = SoftskillRouter;