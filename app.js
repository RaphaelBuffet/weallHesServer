const express = require('express')
const bodyParser= require('body-parser')
require('dotenv').config();
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const multer  = require('multer');
const crypto = require('crypto');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path =  './uploads/' + req.userId + "/";
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
        cb(null, path)
        req.pathFile = path;
    },
    filename: function (req, file, cb) {
        console.log(file);
        req.originalNameFile = file.originalname;
        cb(null, Date.now() + file.originalname)
    }
});
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path =  './image_profile/' + req.userId + "/";
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
        cb(null, path)
        req.pathFile = path;
    },
    filename: function (req, file, cb) {
        console.log(file);
        req.originalNameFile = file.originalname;
        cb(null, file.originalname)
    }
})
const Auth = require('./middleware/Auth').Auth;

const ChatRouter = require('./modules/chat/routes');
const UserRouter = require('./modules/user/routes');

const upload = multer({ storage: storage })
const uploadImage = multer({ storage: imageStorage })

const authToken = crypto.randomBytes (64) .toString ('base64');
global.db = require('./bdd/connexionDB').getCon();
global.config = require('./assets/config')

// creation des variables des chemin d'acces
let BeneficeExterneRouter= express.Router()
let ContratRouter= express.Router()
let CursusRouter= express.Router()
let DegreRouter = express.Router()
let DispoRouter = express.Router()
let EntrepriseRouter= express.Router()
let EthiqueRouter= express.Router()
let FiltreRouter= express.Router()
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
let FileRouter = express.Router();

// importation des classe de requete
let BeneficeExterne= require('./assets/classes/benefice_externe-class')
let Contrat= require('./assets/classes/contrat-class')
let Cursus= require('./assets/classes/cursus-class')
let Degre= require('./assets/classes/degre-class')
let Dispo= require('./assets/classes/dispo-class')
let Entreprise= require('./assets/classes/entreprise-class')
let Ethique= require('./assets/classes/ethique-class')
let Filtre= require('./assets/classes/filtre-class')
let Formation= require('./assets/classes/formation-class')
let Langue= require('./assets/classes/langue-class')
let Localite= require('./assets/classes/localite-class')
let Niveau= require('./assets/classes/niveau-class')
let NiveauLangue= require('./assets/classes/niveauLangue-class')
let Offre= require('./assets/classes/offre-class')
let Postulant= require('./assets/classes/postulant-class')
let Salaire= require('./assets/classes/salaire-class')
let Secteur= require('./assets/classes/secteur-class')
let Softskill= require('./assets/classes/softskill-class')
let Taux = require('./assets/classes/taux-class')
let Type= require('./assets/classes/type-class')
let FileTemp = require('./files/temp')
const fs = require("fs");

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
//requete de filtre
FiltreRouter.route('/')
    .post(async (req,res)=>{
        let filtre = await Filtre.getProfilFilter(req.body.id)
        await console.log("App"+filtre)
        await res.json(filtre)
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

FileRouter.route('/upload/temp') //
    .post(upload.single('file'),async (req, res,next) => {
        var path = req.pathFile.replace('./uploads/', 'http://' + req.headers.host+"/files/") + req.file.filename;
    res.json({
        filename: req.originalNameFile,
        path: path,
        size : req.file.size,
        ok:"ok"
    });
});

FileRouter.route('/upload/profil_image') //
    .post(uploadImage.single('file'),async (req, res,next) => {
        console.log("OKOK")
        var path = req.pathFile.replace('./uploads/', 'http://' + req.headers.host+"/image_profile/") + req.file.filename;
        res.json({
            filename: req.originalNameFile,
            path: path,
            size : req.file.size
        });
    });
// creation des chemins d'acces pour chaque table de la BDD
app.get('/coucou', (req,res) => {
   res.end("ok");
});
app.get('/coucouMoi', Auth, (req,res, next) => {
    res.end('Salut toi, ton id est ' + req.userId + ' non ?');
})

app.use(config.rootAPI+'benefice',BeneficeExterneRouter)
app.use(config.rootAPI+'contrat',ContratRouter)
app.use(config.rootAPI+'cursus',CursusRouter)
app.use(config.rootAPI+'degre',DegreRouter)
app.use(config.rootAPI+'dispo',DispoRouter)
app.use(config.rootAPI+'entreprise',EntrepriseRouter)
app.use(config.rootAPI+'ethique',EthiqueRouter)
app.use(config.rootAPI+'filtre',FiltreRouter)
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
app.use(config.rootAPI+'chat',Auth, ChatRouter);
app.use(config.rootAPI+'files', Auth,FileRouter);
app.use('/files', express.static(path.join(__dirname+"/uploads")));
app.use('/image_profile', express.static(path.join(__dirname+"/image_profile")));

io.on('connection', (socket) => {
    console.log('a user connected');
    let message = require('./modules/chat/socket/message')(db,io);
    socket.on("chat message", msg => message.postMessage(msg));
});

// ouverture du port pour les requetea
http.listen(process.env.PORT || '8080', () => console.log('started on '+ (process.env.PORT || 8080)))
