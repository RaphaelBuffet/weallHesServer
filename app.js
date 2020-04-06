const mysql=require('promise-mysql')
const express = require('express')
const bodyParser= require('body-parser')
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const {success,error,checkAndChange} = require('./assets/functions')
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
    let MembersRouter = express.Router()
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
    let Members= require('./assets/classes/member-class')(db,config)
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

    console.log(Members)

    app.use(morgan);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    MembersRouter.route('/:id')

        // recupère le nom d'un membre grace à son id
        .get(async (req,res)=>{
            let member = await Members.getById(req.params.id)
            await res.json(checkAndChange(member))
        })

        // modifie le nom d'un membre grace à son id
        .put((req,res)=>{
            if (req.body.name) {
                db.query('Select * from members WHERE id = ?',[req.params.id], (err,result)=> {
                    if(err) {
                        res.json(error(err.message))
                    } else {
                        if (result[0]!=undefined) {

                            db.query('Select * from members where nom=? And id!=?', [req.body.name, req.params.id], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {

                                    if (result[0] != undefined) {
                                        res.json(error("same name"))
                                    } else {

                                        db.query('Update members Set nom= ? where id=?', [req.body.name, req.params.id], (err, result) => {
                                            if (err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success(true))
                                            }
                                        })
                                    }
                                }
                            })
                        } else{
                            res.json(error('wrong id'))
                        }
                    }
                })
            } else {
                res.json("no name value")
            }
        })
        // supprime un membre grace à son id
        .delete((req,res)=> {
            db.query('Select * from members WHERE id= ?',[req.params.id], (err,result)=> {
                if(err) {
                    res.json(error(err.message))
                } else {
                    if (result[0]!=undefined){

                        db.query("Delete from members where id=?",[req.params.id],(err,result)=> {
                            if(err){
                                res.json(error(err.message))
                            } else{
                                res.json(success(true))
                            }
                        })
                    } else{
                        res.json(error('wrong id'))
                    }
                }
            })
        })

    MembersRouter.route('/')
        // récupère la listes des membres
        // nous avons mis que si nous mettons un parametre '?max=x' il nous sorts que les x premiers
        .get(async (req,res)=>{
            let allMembers=await Members.getAll(req.query.max)
            res.json(checkAndChange(allMembers))
        })
        //crée un nouveau membre et un nouvelle id associé
        .post(async (req,res) => {
            let addMember= await Members.add(req.body.name)
            res.json(checkAndChange(addMember))
        })
    //requete d'année d'expérience
    AnneeXPRouter.route('/')
        .get(async (req,res)=>{
            let allXP=await AnneeXP.getAll(req.query.max)
            res.json(checkAndChange(allXP))
        })
    AnneeXPRouter.route('/:id')
        .get(async (req,res)=>{
            let xp = await AnneeXP.getById(req.params.id)
            await res.json(checkAndChange(xp))
        })
    //requète de Contrat
    ContratRouter.route('/')
        .get(async (req,res)=>{
            let allContrat=await Contrat.getAll(req.query.max)
            res.json(checkAndChange(allContrat))
        })
    ContratRouter.route('/:id')
        .get(async (req,res)=>{
            let contrat = await Contrat.getById(req.params.id)
            await res.json(checkAndChange(contrat))
        })
    //requete de diplome
    DiplomeRouter.route('/')
        .get(async (req,res)=>{
            let allDiplome=await Diplome.getAll(req.query.max)
            res.json(checkAndChange(allDiplome))
        })
    DiplomeRouter.route('/:id')
        .get(async (req,res)=>{
            let diplome = await Diplome.getById(req.params.id)
            await res.json(checkAndChange(diplome))
        })
    // requete de dispo
    DispoRouter.route('/')
        .get(async (req,res)=>{
            let allDispo=await Dispo.getAll(req.query.max)
            res.json(checkAndChange(allDispo))
        })
        .post(async (req,res) => {
            let addDispo= await Dispo.add(req.body.name)
            res.json(checkAndChange(addDispo))
        })
    DispoRouter.route('/:id')
        .get(async (req,res)=>{
            let dispo = await Dispo.getById(req.params.id)
            await res.json(checkAndChange(dispo))
        })
    //requete de formation
    FormationRouter.route('/')
        .get(async (req,res)=>{
            let allFormation=await Formation.getAll(req.query.max)
            res.json(checkAndChange(allFormation))
        })
    FormationRouter.route('/:id')
        .get(async (req,res)=>{
            let formation = await Formation.getById(req.params.id)
            await res.json(checkAndChange(formation))
        })
    //requete de langue
    LangueRouter.route('/')
        .get(async (req,res)=>{
            let allLangue=await Langue.getAll(req.query.max)
            res.json(checkAndChange(allLangue))
        })
    LangueRouter.route('/:id')
        .get(async (req,res)=>{
            let langue = await Langue.getById(req.params.id)
            await res.json(checkAndChange(langue))
        })
    //requete de localite
    LocaliteRouter.route('/')
        .get(async (req,res)=>{
            let allLocalite=await Localite.getAll(req.query.max)
            res.json(checkAndChange(allLocalite))
        })
    LocaliteRouter.route('/:id')
        .get(async (req,res)=>{
            let localite = await Localite.getById(req.params.id)
            await res.json(checkAndChange(localite))
        })
    //requete de niveau
    NiveauRouter.route('/')
        .get(async (req,res)=>{
            let allNiveau=await Niveau.getAll(req.query.max)
            res.json(checkAndChange(allNiveau))
        })
    NiveauRouter.route('/:id')
        .get(async (req,res)=>{
            let niveau = await Niveau.getById(req.params.id)
            await res.json(checkAndChange(niveau))
        })
    // requete de secteur
    SecteurRouter.route('/')
        .get(async (req,res)=>{
            let allSecteurs=await Secteur.getAll(req.query.max)
            res.json(checkAndChange(allSecteurs))
        })
    SecteurRouter.route('/:id')
        .get(async (req,res)=>{
            let secteur = await Secteur.getById(req.params.id)
            await res.json(checkAndChange(secteur))
        })
    //requete de taux d activite
    TauxActiviteRouter.route('/')
        .get(async (req,res)=>{
            let alltaux=await TauxActivite.getAll(req.query.max)
            res.json(checkAndChange(alltaux))
        })
    TauxActiviteRouter.route('/:id')
        .get(async (req,res)=>{
            let taux = await TauxActivite.getById(req.params.id)
            await res.json(checkAndChange(taux))
        })

    // creation des chemins d'acces pour chaque table de la BDD
    app.use(config.rootAPI+'members',MembersRouter)
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

