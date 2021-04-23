const Formation = require('./request/formation')
const express = require('express')
const FormationRouter = express.Router();

FormationRouter.get('/', Formation.getall);
FormationRouter.get('/:id', Formation.getById);
FormationRouter.get('/postulant/:id', Formation.getByPostulant);
FormationRouter.put('/:id', Formation.modifyFormation);
FormationRouter.delete('/postulant/:id', Formation.deleteFormation);

module.exports = FormationRouter;