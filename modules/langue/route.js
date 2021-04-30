const Langue = require('./request/langue')
const express = require('express')
const LangueRouter = express.Router();

LangueRouter.get('/', Langue.getall);
LangueRouter.get('/:id', Langue.getById);
LangueRouter.get('/postulant/:id', Langue.getByPostulant);
LangueRouter.get('/sejours/:id_postulant/', Langue.getAllSejours);
LangueRouter.put('/postulant/:id_postulant/:id_langue', Langue.modifyLanguePostulant);
LangueRouter.put('/sejours/:id_postulant/:id_langue', Langue.modifySejours);
LangueRouter.delete('/postulant/:id', Langue.deleteLangue);

module.exports = LangueRouter;