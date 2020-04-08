let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Postulant
}
let Postulant =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from postulant WHERE id= ?',[id])
                .then((result)=> {
                    if (result[0]!=undefined){
                        next(result[0])
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
                db.query('Select * from Postulant Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error(config.errors.wrongMaxValue))

            }
            else {
                db.query('Select * from Postulant')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }
    static add(username,password,description,photo,salaire,derniereExperience,idAnneeExperience,idDiplome,idFormation,idDisponibilite,idSecteurs){
        return new Promise((next)=> {

            if (username != undefined && description != undefined && photo != undefined && salaire != undefined
                && derniereExperience != undefined && idAnneeExperience != undefined && idDiplome != undefined && idFormation != undefined
                && idDisponibilite != undefined && idSecteurs != undefined) {



                db.query('Select * from postulant where Username = ?', [username])
                    .then((result) => {

                        if (result[0] != undefined) {
                            next(new Error(config.errors.nameAlreadyTaken))
                        } else {
                            return db.query('Insert into postulant(Username,Password,Description,Photo,Salaire,DerniereExperience,IdAnneeExperience,IdDiplome,IdFormation,IdDisponibilite,IdSecteurs) values (?)', [username,password,description,photo,salaire,derniereExperience,idAnneeExperience,idDiplome,idFormation,idDisponibilite,idSecteurs])
                        }
                    })
                    .then(()=>{
                        return db.query('Select * from members where Username = ?', [username])
                    })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            Username: result[0].username
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noNameValue))
            }

        })
    }
    static update(id,username,password,description,photo,salaire,derniereExperience,idAnneeExperience,idDiplome,idFormation,idDisponibilite,idSecteurs){
        return new Promise((next)=>{

            if (username != undefined) {

                db.query('Select * from postulant WHERE id = ?',[id])
                    .then((result)=>{
                        if (result[0]!=undefined) {
                            return db.query('Select * from postulant where username=? And id!=?', [username, id])
                        } else{
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then((result)=>{
                        if (result[0] != undefined) {
                            next(new Error(config.errors.sameName))
                        } else {
                            return db.query('Update postulant Set username=?,password=?,description=?,photo=?,salaire=?,derniereExperience=?,idAnneeExperience=?,idDiplome=?,idFormation=?,idDisponibilite=?,idSecteurs=? where id=?', [username,password,description,photo,salaire,derniereExperience,idAnneeExperience,idDiplome,idFormation,idDisponibilite,idSecteurs, id])
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

}