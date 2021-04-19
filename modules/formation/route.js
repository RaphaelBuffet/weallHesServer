const Formation = require('./request/formation')
const express = require('express')
const FormationRouter = express.Router();

FormationRouter.get('/', Formation.getall);
FormationRouter.get('/:id', Formation.getById);

module.exports = FormationRouter;