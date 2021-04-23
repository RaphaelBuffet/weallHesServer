const Competence = require('./request/competence')
const express = require('express')
const CompetenceRouter = express.Router();

CompetenceRouter.get('/', Competence.getall);
CompetenceRouter.get('/:id', Competence.getById);
CompetenceRouter.get('/postulant/:id', Competence.getByPostulant);
CompetenceRouter.put('/postulant/:id_postulant/:id_competence', Competence.modifyCompetence);
CompetenceRouter.delete('/postulant/:id', Competence.deleteCompetence);

module.exports = CompetenceRouter;