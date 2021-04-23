const Experience = require('./request/experience')
const express = require('express')
const ExperienceRouter = express.Router();

ExperienceRouter.get('/', Experience.getall);
ExperienceRouter.get('/:id', Experience.getById);
ExperienceRouter.get('/postulant/:id', Experience.getByPostulant);
ExperienceRouter.put('/:id', Experience.modifyExperience);
ExperienceRouter.delete('/postulant/:id', Experience.deleteExperience);

module.exports = ExperienceRouter;