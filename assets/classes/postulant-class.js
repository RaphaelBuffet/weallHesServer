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
                        next(new Error('Wrong id'))
                    }
                })
                .catch((err) => next(err))

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
                            next(new Error("name already taken"))
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
                next(new Error('no name value'))
            }

        })
    }

}