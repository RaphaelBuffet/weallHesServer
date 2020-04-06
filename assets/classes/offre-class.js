let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Offre
}
let Offre =class {
    static getById(id){
        return new Promise((next) => {
            db.query('Select * from offre WHERE id= ?',[id])
                .then((result)=> {
                    if (result[0]!=undefined){
                        next(result[0])
                    }
                    else {
                        next(new Error('Wrong id'))
                    }
                })
                .catch((err) => next(err))
        })
    }
    static getByEntreprise(id){
        return new Promise((next) => {
            db.query('Select * from offre WHERE idEntreprise = ?',[id])
                .then((result)=> {
                    if (result[0]!=undefined){
                        next(result)
                    }
                    else {
                        next(new Error('Wrong id'))
                    }
                })
                .catch((err) => next(err))
        })
    }
    static add(name,cahierCharge,idEntreprise,idDisponibilite,idContrat,idTauxActivite,idLocalite,idSecteur){
        return new Promise((next)=> {

            if (name != undefined && cahierCharge != undefined && idEntreprise != undefined && idDisponibilite != undefined && idContrat != undefined && idTauxActivite != undefined && idLocalite != undefined && idSecteur != undefined) {

                db.query('Insert into offre(name,cahierCharge,idEntreprise,idDisponibilite,idContrat,idTauxActivite,idLocalite,idSecteur) values (?)', [name,cahierCharge,idEntreprise,idDisponibilite,idContrat,idTauxActivite,idLocalite,idSecteur])
                    .then(()=>{
                        return db.query('Select * from offre where name = ?', [name])
                    })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            name: result[0].name
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error('no name value'))
            }

        })
    }

}