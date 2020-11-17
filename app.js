const mysql=require('promise-mysql')
const express = require('express')
const bodyParser= require('body-parser')
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
const {checkAndChange} = require('./assets/functions')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const fs = require('fs');
const multer  = require('multer');
const crypto = require('crypto');
var bcrypt = require('bcrypt');
const { type } = require('os')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const authToken = crypto.randomBytes (64) .toString ('base64');
mysql.createConnection(
    {
        host: config.db.host,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password
    }).then((db)=>{
    console.log('connected')
    console.log(authToken)
    // creation des variables des chemin d'acces
    let BeneficeExterneRouter= express.Router()
    let ContratRouter= express.Router()
    let CursusRouter= express.Router()
    let DegreRouter = express.Router()
    let DispoRouter = express.Router()
    let EntrepriseRouter= express.Router()
    let EthiqueRouter= express.Router()
    let FormationRouter = express.Router()
    let LangueRouter= express.Router()
    let LocaliteRouter = express.Router()
    let NiveauRouter= express.Router()
    let NiveauLangueRouter = express.Router()
    let OffreRouter= express.Router()
    let PostulantRouter = express.Router()
    let SalaireRouter= express.Router()
    let SecteurRouter= express.Router()
    let SoftskillRouter= express.Router()
    let TauxRouter= express.Router()
    let TypeRouter= express.Router()
    let UserRouter= express.Router()
    let ChatRouter = express.Router();
    let FileRouter = express.Router();

    // importation des classe de requete
    let BeneficeExterne= require('./assets/classes/benefice_externe-class')(db,config)
    let Contrat= require('./assets/classes/contrat-class')(db,config)
    let Cursus= require('./assets/classes/cursus-class')(db,config)
    let Degre= require('./assets/classes/degre-class')(db,config)
    let Dispo= require('./assets/classes/dispo-class')(db,config)
    let Entreprise= require('./assets/classes/entreprise-class')(db,config)
    let Ethique= require('./assets/classes/ethique-class')(db,config)
    let Formation= require('./assets/classes/formation-class')(db,config)
    let Langue= require('./assets/classes/langue-class')(db,config)
    let Localite= require('./assets/classes/localite-class')(db,config)
    let Niveau= require('./assets/classes/niveau-class')(db,config)
    let NiveauLangue= require('./assets/classes/niveauLangue-class')(db,config)
    let Offre= require('./assets/classes/offre-class')(db,config)
    let Postulant= require('./assets/classes/postulant-class')(db,config)
    let Salaire= require('./assets/classes/salaire-class')(db,config)
    let Secteur= require('./assets/classes/secteur-class')(db,config)
    let Softskill= require('./assets/classes/softskill-class')(db,config)
    let Taux = require('./assets/classes/taux-class')(db,config)
    let Type= require('./assets/classes/type-class')(db,config)
    let User= require('./assets/classes/user-class')(db,config)
    let Chat = require('./chat/request/message')(db,config);
    let FileTemp = require('./files/temp')(db,config);

    app.use(morgan);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //requète de Benefice externe
    BeneficeExterneRouter.route('/')
        .get(async (req,res)=>{
            let allBenef=await BeneficeExterne.getAll()
            await res.json(allBenef)
        })
    BeneficeExterneRouter.route('/:id')
        .get(async (req,res)=>{
            let benef = await BeneficeExterne.getById(req.params.id)
            await res.json(benef)
        })
    //requète de Contrat
    ContratRouter.route('/')
        .get(async (req,res)=>{
            let allContrat=await Contrat.getAll()
            await res.json(allContrat)
        })
    ContratRouter.route('/:id')
        .get(async (req,res)=>{
            let contrat = await Contrat.getById(req.params.id)
            await res.json(contrat)
        })
    //requète de Cursus
    CursusRouter.route('/')
        .get(async (req,res)=>{
            let allcursus=await Cursus.getAll()
            await res.json(allcursus)
        })
    CursusRouter.route('/:id')
        .get(async (req,res)=>{
            let cursus = await Cursus.getById(req.params.id)
            await res.json(cursus)
        })
    //requete de degre
    DegreRouter.route('/')
        .get(async (req,res)=>{
            let allDegre=await Degre.getAll()
            await res.json(allDegre)
        })
    DegreRouter.route('/:id')
        .get(async (req,res)=>{
            let degre = await Degre.getById(req.params.id)
            await res.json(degre)
        })
    // requete de dispo
    DispoRouter.route('/')
        .get(async (req,res)=>{
            let allDispo=await Dispo.getAll()
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
    //requete de ethique
    EthiqueRouter.route('/')
        .get(async (req,res)=>{
            let allEthique=await Ethique.getAll()
            await res.json(allEthique)
        })
    EthiqueRouter.route('/:id')
        .get(async (req,res)=>{
            let ethique = await Ethique.getById(req.params.id)
            await res.json(ethique)
        })
    //requete de formation
    FormationRouter.route('/')
        .get(async (req,res)=>{
            let allFormation=await Formation.getAll()
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
            let allLangue=await Langue.getAll()
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
            let allLocalite=await Localite.getAll()
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
            let allNiveau=await Niveau.getAll()
            await res.json(allNiveau)
        })
    NiveauRouter.route('/:id')
        .get(async (req,res)=>{
            let niveau = await Niveau.getById(req.params.id)
            await res.json(niveau)
        })
    // requete de salaire
    SalaireRouter.route('/')
        .get(async (req,res)=>{
            let allSalaire=await Salaire.getAll()
            res.json(allSalaire)
        })
    SalaireRouter.route('/:id')
        .get(async (req,res)=>{
            let salaire = await Salaire.getById(req.params.id)
            await res.json(salaire)
        })
    // requete de secteur
    SecteurRouter.route('/')
        .get(async (req,res)=>{
            let allSecteurs=await Secteur.getAll()
            res.json(allSecteurs)
        })
    SecteurRouter.route('/:id')
        .get(async (req,res)=>{
            let secteur = await Secteur.getById(req.params.id)
            await res.json(secteur)
        })
    // requete de softskill
    SoftskillRouter.route('/')
        .get(async (req,res)=>{
            let allSoftskill=await Softskill.getAll()
            res.json(allSoftskill)
        })
    SoftskillRouter.route('/:id')
        .get(async (req,res)=>{
            let softskill = await Softskill.getById(req.params.id)
            await res.json(softskill)
        })
    //requete de taux d activite
    TauxRouter.route('/')
        .get(async (req,res)=>{
            let alltaux=await Taux.getAll()
            await res.json(alltaux)
        })
    TauxRouter.route('/:id')
        .get(async (req,res)=>{
            let taux = await Taux.getById(req.params.id)
            await res.json(taux)
        })
    //requete de type d'entreprise
    TypeRouter.route('/')
        .get(async (req,res)=>{
            let alltype=await Type.getAll()
            await res.json(alltype)
        })
    TypeRouter.route('/:id')
        .get(async (req,res)=>{
            let type = await Type.getById(req.params.id)
            await res.json(type)
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
            let offreFilter = await Offre.getByFilter(req.query.idDisponibilite,req.query.idContrat,req.query.idTaux,req.query.idLocalite,req.query.idSecteur)
            await res.json(offreFilter)
        })
    OffreRouter.route('/id/:id')
        .get(async (req,res)=>{
            let offre = await Offre.getById(req.params.id)
            await res.json(offre)
        })
        .put(async (req,res)=>{
            let updateOffre=await Offre.update(req.params.id,req.body.name,req.body.cahierCharge,req.body.idEntreprise,req.body.idDisponibilite,req.body.idContrat,req.body.idTaux,req.body.idLocalite,req.body.idSecteur)
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
            let updatePostulant=await Postulant.update(req.params.id,req.body.username,req.body.password,req.body.description,req.body.photo,req.body.salaire,req.body.derniereExperience,req.body.idDegre,req.body.idFormation,req.body.idDisponibilite,req.body.idSecteurs)
            await res.json(updatePostulant)
        })
        .delete(async (req,res)=> {
            let deletePostulant=await Postulant.delete(req.params.id)
            await res.json(deletePostulant)
        })
    PostulantRouter.route('/filter')
        .get(async (req,res)=>{
            let postulantfilter = await Postulant.getByFilter(req.query.salaire,req.query.derniereExperience,req.query.idDegre,req.query.idFormation,req.query.idDisponibilite,req.query.idSecteurs)
            await res.json(postulantfilter)
        })
    UserRouter.route('/')
            .get(async (req, res) => {
                let users = await User.getAll()
                await res.json(users)
            })
            .post(async (req, res) => {
                email = req.body.email
                password = req.body.password
                entreprise = req.body.entreprise
                bcrypt.hash(password, 10, function (err, hash) {
                    var sql = "INSERT INTO user (e_mail,mot_de_passe,entreprise) VALUES ?";
                    var values = [[email, hash, entreprise]]
                    db.query(sql, [values], function (err, result, fields) {
                        if (err) throw err;
                        res.send({
                            message: 'Table Data',
                            Total_record: result.length,
                            result: result
                        });
                    });
                });
            });
    UserRouter.route('/:id')
    .get(async (req,res)=>{
        let user = await User.getById(req.params.id)
        await res.json(user)
    })
    UserRouter.route('/token')
    .post(async (req,res)=>{
       clientPassword=req.body.password
       let dbPassword=await User.getByEmail(req.body.email)
       let accountType
       if(dbPassword[0].entreprise===1){
        accountType="entreprise"
       }
       else{
        accountType="postulant"
       }
       bcrypt.compare(clientPassword,dbPassword[0].mot_de_passe,function(err,ismatch){
        if (!ismatch) {
            res.statusCode=401;
            res.json("connection failed")
        }
        else{
            res.json({
                email:req.body.email,
                token: authToken,
                type:accountType
            })
        }
       })
    })
    ChatRouter.route('/myHistoric')
        .get(async (req, res)=>{
            let myHistorical = await Chat.myHistory(req.header('myId') || 1);
            await res.json(myHistorical);
        });
    ChatRouter.route('/:id')
        .get(async (req,res) => {
            let historical = await Chat.myHistoryWith(req.header('myId') || 1,req.params.id);
            await res.json(historical);
        })
    FileRouter.route('/upload/temp') //
        .post(upload.single('file'),async (req, res,next) => {
        console.log(req.file);
        //below code will read the data from the upload folder. Multer     will automatically upload the file in that folder with an  autogenerated name
        /*fs.readFile(req.file.path,(err, contents)=> {
            if (err) {
                console.log('Error: ', err);
            }else{
                console.log('File contents ',contents);
            }
        });*/
    });
    // creation des chemins d'acces pour chaque table de la BDD
    app.get('/coucou', (req,res) => {
       res.end("ok");
    });
    app.use(config.rootAPI+'benefice',BeneficeExterneRouter)
    app.use(config.rootAPI+'contrat',ContratRouter)
    app.use(config.rootAPI+'cursus',CursusRouter)
    app.use(config.rootAPI+'degre',DegreRouter)
    app.use(config.rootAPI+'dispo',DispoRouter)
    app.use(config.rootAPI+'entreprise',EntrepriseRouter)
    app.use(config.rootAPI+'ethique',EthiqueRouter)
    app.use(config.rootAPI+'formation',FormationRouter)
    app.use(config.rootAPI+'langue',LangueRouter)
    app.use(config.rootAPI+'localite',LocaliteRouter)
    app.use(config.rootAPI+'niveau',NiveauRouter)
    app.use(config.rootAPI+'niveaulangue',NiveauLangueRouter)
    app.use(config.rootAPI+'salaire',SalaireRouter)
    app.use(config.rootAPI+'offre',OffreRouter)
    app.use(config.rootAPI+'postulant',PostulantRouter)
    app.use(config.rootAPI+'secteur',SecteurRouter)
    app.use(config.rootAPI+'softskill',SoftskillRouter)
    app.use(config.rootAPI+'taux',TauxRouter)
    app.use(config.rootAPI+'type',TypeRouter)
    app.use(config.rootAPI+'user',UserRouter)
    app.use(config.rootAPI+'chat',ChatRouter);
    app.use(config.rootAPI+'files',FileRouter);


    io.on('connection', (socket) => {
        console.log('a user connected');
        let message = require('./chat/socket/message')(db,io);
        socket.on("chat message", msg => message.postMessage(msg));
    });

    // ouverture du port pour les requetea
    http.listen(process.env.PORT || '8080', () => console.log('started on '+ (process.env.PORT || 8080)))

}).catch((err)=>{
    console.log('Error during db connection !! !! !! !!')
    console.log(err.message)
})

