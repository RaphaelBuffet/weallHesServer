let db, config
module.exports = (_db, _config)=>{
    db=_db
    config=_config
    return Entreprise
}
let Entreprise =class {
    static getById(id){

        return new Promise((next) => {
            db.query('Select * from entreprise WHERE id= ?',[id])
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
    static add(username,password,name,description,photo){
        return new Promise((next)=> {

            if (name != undefined && description != undefined && photo != undefined && login != undefined && password != undefined) {

                db.query('Select * from entreprise where Username= ?', [username])
                    .then((result) => {

                        if (result[0] != undefined) {
                            next(new Error("name already taken"))
                        } else {
                            return db.query('Insert into entreprise(Username,Password,Name,Description,Photo) values (?)', [username,password,name,description,photo])
                        }
                    })
                    .then(()=>{
                        return db.query('Select * from members where Username = ?', [username])
                    })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            username: result[0].username
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error('no name value'))
            }

        })
    }

}