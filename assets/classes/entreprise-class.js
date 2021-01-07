module.exports =  Entreprise =class {
    static getById(id){
        return new Promise((next) => {
            db.query('Select * from entreprise WHERE id= ?',[id],
                (result)=> {
                    if (result[0]!=undefined){
                        next(result[0])
                    }
                    else {
                        next(new Error(config.errors.wrongID))
                    }
                })
        })
    }
    static getAll(max){
        return new Promise((next) => {
            if(max !=undefined && max >0) {
                db.query('Select * from entreprise Limit 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }else if(max !=undefined) {
                next(new Error(config.errors.wrongMaxValue))

            }
            else {
                db.query('Select * from entreprise')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }
    static add(username,password,name,description,photo){
        return new Promise((next)=> {

            if (name != undefined && description != undefined && photo != undefined && login != undefined && password != undefined) {

                db.query('Select * from entreprise where Username= ?', [username])
                    .then((result) => {

                        if (result[0] != undefined) {
                            next(new Error(config.errors.nameAlreadyTaken))
                        } else {
                            return db.query('Insert into entreprise(Username,Password,Name,Description,Photo) values (?)', [username,password,name,description,photo])
                        }
                    })
                    .then(()=>{
                        return db.query('Select * from entreprise where Username = ?', [username])
                    })
                    .then((result)=> {
                        next({
                            id: result[0].id,
                            username: result[0].username
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noNameValue))
            }

        })
    }
    static update(id,username,password,name,description,photo){
        return new Promise((next)=>{

            if (username != undefined) {

                db.query('Select * from entreprise WHERE id = ?',[id])
                    .then((result)=>{
                        if (result[0]!=undefined) {
                            return db.query('Select * from entreprise where name=? And id!=?', [name, id])
                        } else{
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then((result)=>{
                        if (result[0] != undefined) {
                            next(new Error(config.errors.sameName))
                        } else {
                            return db.query('Update entreprise Set username=?,password=?,name=?,description=?,photo=? where id=?', [username,password,name,description,photo, id])
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

            db.query('Select * from entreprise WHERE id= ?',[id])
                .then((result)=>{

                    if (result[0]!=undefined) {
                        return db.query('Delete from entreprise where id=?', [id])
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

}