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
    let MembersRouter = express.Router()
    let Members= require('./assets/classes/member-class')(db,config)
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
        .get((req,res)=>{
            if(req.query.max !=undefined && req.query.max >0){
                db.query('Select * from members Limit 0, ?',[req.query.max],(err,result)=>{
                    if(err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(result))
                    }
                })
            }
            else if(req.query.max !=undefined){
                res.json(error('Wrong max value'))
            } else{
                db.query('Select * from members',(err,result)=>{
                    if(err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(result))
                    }
                })
            }
        })
        //crée un nouveau membre et un nouvelle id associé
        .post((req,res)=> {
            if (req.body.name) {

                db.query('Select * from members where nom= ?', [req.body.name], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {
                            res.json(error("name already taken"))
                        } else {
                            db.query('Insert into members(nom) values (?)', [req.body.name], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    db.query('Select * from members where nom= ?', [req.body.name], (err, result) => {
                                        if (err) {
                                            res.json(error(err.message))
                                        } else {
                                            res.json(success({
                                                id: result[0].id,
                                                name: result[0].nom
                                            }))
                                        }

                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                res.json(error("no name value"))
            }
        })

    app.use(config.rootAPI+'members',MembersRouter)

    app.listen(config.port, () => console.log('started on 8080'))

}).catch((err)=>{
    console.log('Error during db connection')
    console.log(err.message)
})

