const Postulant = require('./request/postulant')
const express = require('express')
const PostulantRouter = express.Router();

PostulantRouter.get('/', Postulant.getall);
PostulantRouter.get('/:id', Postulant.getById);
PostulantRouter.get('/user/:id', Postulant.getByuser);
PostulantRouter.put('/:id', Postulant.modifyPostulant);

module.exports = PostulantRouter;