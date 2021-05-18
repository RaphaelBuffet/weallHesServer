const express = require('express')
const cors= require('cors')
const bodyParser= require('body-parser')
require('dotenv').config();
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
const swaggerDocument2 = require('./assets/swagger2.json');
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
const TypeRouter = require('./modules/type/route');
const TauxRouter = require('./modules/taux/route');
const CantonRouter = require('./modules/canton/route');
const CursusRouter = require('./modules/cursus/route');
const ContratRouter = require('./modules/contrat/route');
const BeneficeExterneRouter = require('./modules/beneficeExterne/route');
const EthiqueRouter = require('./modules/ethique/route');
const FormationRouter = require('./modules/formation/route');
const LangueRouter = require('./modules/langue/route');
const LocaliteRouter = require('./modules/localite/route');
const NiveauRouter = require('./modules/niveau/route');
const SalaireRouter = require('./modules/salaire/route');
const SecteurRouter = require('./modules/secteur/route');
const SoftskillRouter = require('./modules/softskill/route');
const DiplomeRouter = require('./modules/diplome/route');
const DispoRouter = require('./modules/dispo/route');
const PostulantRouter = require('./modules/postulant/route');
const EntrepriseRouter = require('./modules/entreprise/route');
const OffreRouter = require('./modules/offre/route');
const ExperienceRouter = require('./modules/experienceProfessionelle/route');
const CompetenceRouter = require('./modules/competence/route');
const FiltreRouter = require('./modules/filtre/route');

const upload = multer({ storage: storage })
const uploadImage = multer({ storage: imageStorage })

const authToken = crypto.randomBytes (64) .toString ('base64');
global.db = require('./bdd/connexionDB').getCon();
global.config = require('./assets/config')

// creation des variables des chemin d'acces
let FileRouter = express.Router();

// importation des classe de requete
let FileTemp = require('./files/temp')
const fs = require("fs");


app.use(cors())
app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument2));


/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, PATCH, POST, PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,OPTIONS,authorization");
    next();
});*/
//methode upload fichier
FileRouter.route('/upload/temp') 
    .post(upload.single('file'),async (req, res,next) => {
        var path = req.pathFile.replace('./uploads/', 'http://' + req.headers.host+"/files/") + req.file.filename;
    res.json({
        filename: req.originalNameFile,
        path: path,
        size : req.file.size,
        ok:"ok"
    });
});

FileRouter.route('/upload/profil_image') 
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
app.get(config.rootAPI+'coucou', (req,res) => {
   res.end("ok");
});
app.get(config.rootAPI+'coucouMoi', Auth, (req,res, next) => {
    res.end('Salut toi, ton id est ' + req.userId + ' non ?');
})

app.use(config.rootAPI+'benefice',Auth,BeneficeExterneRouter)
app.use(config.rootAPI+'canton',Auth,CantonRouter)
app.use(config.rootAPI+'competence',Auth,CompetenceRouter)
app.use(config.rootAPI+'cursus',Auth,CursusRouter)
app.use(config.rootAPI+'diplome',Auth,DiplomeRouter)
app.use(config.rootAPI+'dispo',Auth,DispoRouter)
app.use(config.rootAPI+'entreprise',Auth,EntrepriseRouter)
app.use(config.rootAPI+'ethique',Auth,EthiqueRouter)
app.use(config.rootAPI+'filtre',FiltreRouter)
app.use(config.rootAPI+'formation',Auth,FormationRouter)
app.use(config.rootAPI+'langue',Auth,LangueRouter)
app.use(config.rootAPI+'localite',Auth,LocaliteRouter)
app.use(config.rootAPI+'niveau',Auth,NiveauRouter)
app.use(config.rootAPI+'salaire',Auth,SalaireRouter)
app.use(config.rootAPI+'offre',OffreRouter)
app.use(config.rootAPI+'postulant',Auth,PostulantRouter)
app.use(config.rootAPI+'secteur',Auth,SecteurRouter)
app.use(config.rootAPI+'softskill',Auth,SoftskillRouter)
app.use(config.rootAPI+'taux',Auth,TauxRouter)
app.use(config.rootAPI+'type',Auth,TypeRouter)
app.use(config.rootAPI+'user',UserRouter)
app.use(config.rootAPI+'contrat',Auth, ContratRouter);
app.use(config.rootAPI+'experience',Auth, ExperienceRouter);
app.use(config.rootAPI+'chat',Auth, ChatRouter);
app.use(config.rootAPI+'files', Auth,FileRouter);
app.use('/files', express.static(path.join(__dirname+"/uploads")));
app.use('/image_profile', express.static(path.join(__dirname+"/image_profile")));

io.on('connection', (socket) => {
    console.log('a user connected to api');
    let message = require('./modules/chat/socket/message')(db,io);
    socket.on("chat message", msg => message.postMessage(msg));
});

// ouverture du port pour les requetea
http.listen(process.env.PORT || '8080', () => console.log('started on '+ (process.env.PORT || 8080)))
