const mysql=require('promise-mysql')
const express = require('express')
const bodyParser= require('body-parser')
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
const {checkAndChange} = require('./assets/functions')
mysql.createConnection(
    {
        host: config.db.host,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password
    }).then((db)=>{
    console.log('connected')
    const app = express();
    // creation des variables des chemin d'acces
    let AnneeXPRouter= express.Router()
    let ContratRouter= express.Router()
    let DiplomeRouter = express.Router()
    let DispoRouter = express.Router()
    let EntrepriseRouter= express.Router()
    let FormationRouter = express.Router()
    let LangueRouter= express.Router()
    let LocaliteRouter = express.Router()
    let NiveauRouter= express.Router()
    let NiveauLangueRouter = express.Router()
    let OffreRouter= express.Router()
    let PostulantRouter = express.Router()
    let SecteurRouter= express.Router()
    let TauxActiviteRouter= express.Router()

    // importation des classe de requete
    let AnneeXP= require('./assets/classes/anneeXP-class')(db,config)
    let Contrat= require('./assets/classes/contrat-class')(db,config)
    let Diplome= require('./assets/classes/diplome-class')(db,config)
    let Dispo= require('./assets/classes/dispo-class')(db,config)
    let Entreprise= require('./assets/classes/entreprise-class')(db,config)
    let Formation= require('./assets/classes/formation-class')(db,config)
    let Langue= require('./assets/classes/langue-class')(db,config)
    let Localite= require('./assets/classes/localite-class')(db,config)
    let Niveau= require('./assets/classes/niveau-class')(db,config)
    let NiveauLangue= require('./assets/classes/niveauLangue-class')(db,config)
    let Offre= require('./assets/classes/offre-class')(db,config)
    let Postulant= require('./assets/classes/postulant-class')(db,config)
    let Secteur= require('./assets/classes/secteur-class')(db,config)
    let TauxActivite= require('./assets/classes/tauxActivite-class')(db,config)

    app.use(morgan);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //requete d'année d'expérience
    AnneeXPRouter.route('/')
        .get(async (req,res)=>{
            let allXP=await AnneeXP.getAll(req.query.max)
            await res.json(allXP)
        })
    AnneeXPRouter.route('/:id')
        .get(async (req,res)=>{
            let xp = await AnneeXP.getById(req.params.id)
            await res.json(xp)
        })
    //requète de Contrat
    ContratRouter.route('/')
        .get(async (req,res)=>{
            let allContrat=await Contrat.getAll(req.query.max)
            await res.json(allContrat)
        })
    ContratRouter.route('/:id')
        .get(async (req,res)=>{
            let contrat = await Contrat.getById(req.params.id)
            await res.json(contrat)
        })
    //requete de diplome
    DiplomeRouter.route('/')
        .get(async (req,res)=>{
            let allDiplome=await Diplome.getAll(req.query.max)
            await res.json(allDiplome)
        })
    DiplomeRouter.route('/:id')
        .get(async (req,res)=>{
            let diplome = await Diplome.getById(req.params.id)
            await res.json(diplome)
        })
    // requete de dispo
    DispoRouter.route('/')
        .get(async (req,res)=>{
            let allDispo=await Dispo.getAll(req.query.max)
            await res.json(allDispo)
        })
        .post(async (req,res) => {
            let addDispo= await Dispo.add(req.body)
            await res.json(addDispo)
        })
    DispoRouter.route('/:id')
        .get(async (req,res)=>{
            let dispo = await Dispo.getById(req.params.id)
            await res.json(dispo)
        })
    //requete de formation
    FormationRouter.route('/')
        .get(async (req,res)=>{
            let allFormation=await Formation.getAll(req.query.max)
            await res.json(allFormation)
        })
    FormationRouter.route('/:id')
        .get(async (req,res)=>{
            let formation = await Formation.getById(req.params.id)
            await res.json(formation)
        })
    //requete de langue
    LangueRouter.route('/')
        .get(async (req,res)=>{
            let allLangue=await Langue.getAll(req.query.max)
            await res.json(allLangue)
        })
    LangueRouter.route('/:id')
        .get(async (req,res)=>{
            let langue = await Langue.getById(req.params.id)
            await res.json(langue)
        })
    //requete de localite
    LocaliteRouter.route('/')
        .get(async (req,res)=>{
            let allLocalite=await Localite.getAll(req.query.max)
            await res.json(allLocalite)
        })
    LocaliteRouter.route('/:id')
        .get(async (req,res)=>{
            let localite = await Localite.getById(req.params.id)
            await res.json(localite)
        })
    //requete de niveau
    NiveauRouter.route('/')
        .get(async (req,res)=>{
            let allNiveau=await Niveau.getAll(req.query.max)
            await res.json(allNiveau)
        })
    NiveauRouter.route('/:id')
        .get(async (req,res)=>{
            let niveau = await Niveau.getById(req.params.id)
            await res.json(niveau)
        })
    // requete de secteur
    SecteurRouter.route('/')
        .get(async (req,res)=>{
            let allSecteurs=await Secteur.getAll(req.query.max)
            res.json(allSecteurs)
        })
    SecteurRouter.route('/:id')
        .get(async (req,res)=>{
            let secteur = await Secteur.getById(req.params.id)
            await res.json(secteur)
        })
    //requete de taux d activite
    TauxActiviteRouter.route('/')
        .get(async (req,res)=>{
            let alltaux=await TauxActivite.getAll(req.query.max)
            await res.json(alltaux)
        })
    TauxActiviteRouter.route('/:id')
        .get(async (req,res)=>{
            let taux = await TauxActivite.getById(req.params.id)
            await res.json(taux)
        })
    //requete d'entreprise
    EntrepriseRouter.route('/')
        .get(async (req,res)=>{
            let allEntreprise=await Entreprise.getAll(req.query.max)
            await res.json(allEntreprise)
        })
        .post(async (req,res) => {
            let addEntreprise= await Entreprise.add(req.body)
            await res.json(addEntreprise)
        })
    EntrepriseRouter.route('/:id')
        .get(async (req,res)=>{
            let entreprise = await Entreprise.getById(req.params.id)
            await res.json(entreprise)
        })
        .put(async (req,res)=>{
            let updateEntreprise=await Entreprise.update(req.params.id,req.body.username,req.body.password,req.body.name,req.body.description,req.body.photo)
            await res.json(updateEntreprise)
        })
        .delete(async (req,res)=> {
            let deletEntrprise=await Entreprise.delete(req.params.id)
            await res.json(deletEntrprise)
        })
    //requete de niveau de langue
    NiveauLangueRouter.route('/')
        .post(async (req,res) => {
            let addLangue= await NiveauLangue.add(req.body)
            await res.json(addLangue)
        })
    NiveauLangueRouter.route('/:id')
        .get(async (req,res)=>{
            let langueniveau = await NiveauLangue.getByPostulant(req.params.id)
            await res.json(langueniveau)
        })
        .put(async (req,res)=>{
            let updateLangue=await NiveauLangue.update(req.params.id,req.body.idPostulant,req.body.idLangue,req.body.idNiveau)
            await res.json(updateLangue)
        })
        .delete(async (req,res)=> {
            let deleteLangue=await NiveauLangue.delete(req.params.id)
            await res.json(deleteLangue)
        })
    //requete Offre
    OffreRouter.route('/')
        .post(async (req,res) => {
            let addOffre= await Offre.add(req.body)
            await res.json(addOffre)
        })
        .get(async (req,res) => {
            let Offres= await Offre.getAll(req.query.max)
            await res.json(Offres)
        })
    OffreRouter.route('/filter')
        .get(async (req,res)=>{
            let offreFilter = await Offre.getByFilter(req.query.idDisponibilite,req.query.idContrat,req.query.idTauxActivite,req.query.idLocalite,req.query.idSecteur)
            await res.json(offreFilter)
        })
    OffreRouter.route('/id/:id')
        .get(async (req,res)=>{
            let offre = await Offre.getById(req.params.id)
            await res.json(offre)
        })
        .put(async (req,res)=>{
            let updateOffre=await Offre.update(req.params.id,req.body.name,req.body.cahierCharge,req.body.idEntreprise,req.body.idDisponibilite,req.body.idContrat,req.body.idTauxActivite,req.body.idLocalite,req.body.idSecteur)
            await res.json(updateOffre)
        })
        .delete(async (req,res)=> {
            let deletOffre=await Offre.delete(req.params.id)
            await res.json(deletOffre)
        })
    OffreRouter.route('/entreprise/:id')
        .get(async (req,res)=>{
            let offre = await Offre.getByEntreprise(req.params.id)
            await res.json(offre)
        })
    //requete des postulants
    PostulantRouter.route('/')
        .get(async (req,res)=>{
            let allposutlant=await Postulant.getAll(req.query.max)
            await res.json(allposutlant)
        })
        .post(async (req,res) => {
            let addPostulant= await Postulant.add(req.body)
            await res.json(addPostulant)
        })
    PostulantRouter.route('/id/:id')
        .get(async (req,res)=>{
            let postulant = await Postulant.getById(req.params.id)
            await res.json(postulant)
        })
        .put(async (req,res)=>{
            let updatePostulant=await Postulant.update(req.params.id,req.body.username,req.body.password,req.body.description,req.body.photo,req.body.salaire,req.body.derniereExperience,req.body.idAnneeExperience,req.body.idDiplome,req.body.idFormation,req.body.idDisponibilite,req.body.idSecteurs)
            await res.json(updatePostulant)
        })
        .delete(async (req,res)=> {
            let deletePostulant=await Postulant.delete(req.params.id)
            await res.json(deletePostulant)
        })
    PostulantRouter.route('/filter')
        .get(async (req,res)=>{
            let postulantfilter = await Postulant.getByFilter(req.query.salaire,req.query.derniereExperience,req.query.idAnneeExperience,req.query.idDiplome,req.query.idFormation,req.query.idDisponibilite,req.query.idSecteurs)
            await res.json(postulantfilter)
        })

    // creation des chemins d'acces pour chaque table de la BDD
    app.get('coucou', function (req,res) {
       res.json({"status!!" : "ok"})
    });
    app.use(config.rootAPI+'anneexp',AnneeXPRouter)
    app.use(config.rootAPI+'contrat',ContratRouter)
    app.use(config.rootAPI+'diplome',DiplomeRouter)
    app.use(config.rootAPI+'dispo',DispoRouter)
    app.use(config.rootAPI+'entreprise',EntrepriseRouter)
    app.use(config.rootAPI+'formation',FormationRouter)
    app.use(config.rootAPI+'langue',LangueRouter)
    app.use(config.rootAPI+'localite',LocaliteRouter)
    app.use(config.rootAPI+'niveau',NiveauRouter)
    app.use(config.rootAPI+'niveaulangue',NiveauLangueRouter)
    app.use(config.rootAPI+'offre',OffreRouter)
    app.use(config.rootAPI+'postulant',PostulantRouter)
    app.use(config.rootAPI+'secteur',SecteurRouter)
    app.use(config.rootAPI+'taux',TauxActiviteRouter)

    // ouverture du port pour les requetea
    app.listen(config.port, () => console.log('started on 8080'))

}).catch((err)=>{
    console.log('Error during db connection')
    console.log(err.message)
})

