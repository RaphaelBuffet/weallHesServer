const Entreprise = require('./request/entreprise')
const express = require('express')
const EntrepriseRouter = express.Router();

EntrepriseRouter.get('/', Entreprise.getall);
EntrepriseRouter.get('/:id', Entreprise.getById);
EntrepriseRouter.get('/user/:id', Entreprise.getByUser);
EntrepriseRouter.put('/:id', Entreprise.modifyEntreprise);
EntrepriseRouter.put('/contact/:id', Entreprise.modifyContact);

module.exports = EntrepriseRouter;