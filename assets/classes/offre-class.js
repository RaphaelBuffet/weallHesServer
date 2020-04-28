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
                        next(result)
                    }
                    else {
                        next(new Error(config.errors.wrongID))
                    }
                })
                .catch((err) => next(err))
        })
    }
    static getAll(max){
        return new Promise((next) => {
            if(max !=undefined && max >0) {
                db.query('Select * from Offre Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error(config.errors.wrongMaxValue))

            }
            else {
                db.query('Select * from Offre')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
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
                        next(new Error(config.errors.wrongID))
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
                next(new Error(config.errors.noNameValue))
            }

        })
    }
    static update(id,name,cahierCharge,idEntreprise,idDisponibilite,idContrat,idTauxActivite,idLocalite,idSecteur){
        return new Promise((next)=>{

            if (name != undefined) {

                db.query('Select * from Offre WHERE id = ?',[id])
                    .then((result)=>{
                        if (result[0]!=undefined) {
                            return db.query('Select * from Offre where name=? And id!=?', [name, id])
                        } else{
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then((result)=>{
                        if (result[0] != undefined) {
                            next(new Error(config.errors.sameName))
                        } else {
                            return db.query('Update Offre Set name=?,cahierCharge=?,idEntreprise=?,idDisponibilite=?,idContrat=?,idTauxActivite=?,idLocalite=?,idSecteur=? where id=?', [name,cahierCharge,idEntreprise,idDisponibilite,idContrat,idTauxActivite,idLocalite,idSecteur, id])
                        }
                    })
                    .then(()=>{
                        next(true)
                    })
                    .catch((err) => next(err))
            } else {
                next(new Error(config.errors.noValue))
            }
        })
    }
    static delete(id){
        return new Promise((next)=>{

            db.query('Select * from offre WHERE id= ?',[id])
                .then((result)=>{

                    if (result[0]!=undefined) {
                        return db.query('Delete from offre where id=?', [id])
                    }
                    else{
                        next(new Error(config.errors.wrongID))
                    }
                })
                .then(()=>{
                    next(true)
                })
                .catch((err) => next(err))
        })
    }
    static async getByFilter(idDisponibilite,idContrat,idTauxActivite,idLocalite, idSecteurs) {
        return new Promise((next) => {
            let colomn = 0
            let endresult = []

            db.query('Select * from Offre')
                .then((result) => {
                    for (let i = 0; i < result.length; i++) {
                        console.log(i)
                        var row = (result[i]);
                        if (idDisponibilite != undefined) {
                            if (idDisponibilite > row.IdDisponibilite) {
                                row = null
                            }
                        }
                        if (idContrat != undefined) {
                            if (row != null) {
                                if (idContrat != row.IdContrat) {
                                    row = null
                                }
                            }

                        }
                        if (idTauxActivite != undefined) {
                            if (row != null) {
                                if (idTauxActivite < row.IdTauxActivite) {
                                    row = null
                                }
                            }
                        }
                        console.log(idLocalite)
                        if (idLocalite != undefined) {
                            if (row != null) {
                                if (idLocalite != row.IdLocalite) {
                                    row = null
                                }
                            }
                        }
                        if (idSecteurs != undefined) {
                            if (row != null) {
                                if (idSecteurs != row.IdSecteur) {
                                    row = null
                                }
                            }
                        }
                        if (row != null) {
                            endresult[colomn] = row
                            colomn = colomn + 1
                        }
                    }
                    return endresult
                })
                .then(endresult=>{
                    next (endresult)
                })
                .catch((err) => next(err))
        })
    }

}