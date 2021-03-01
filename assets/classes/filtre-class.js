module.exports = filtre = class {

    static async getProfilFilter(id) {
        let taux = await this.getTauxFilter(id)
        let contrat = await this.getTauxFilter(id)
        let localite = await this.getTauxFilter(id)
        let entrepriseType = await this.getTauxFilter(id)
        let ethique = await this.getTauxFilter(id)
        let dispo = await this.getDispoFilter(id)

        console.log(taux)
        console.log(dispo)
        console.log(contrat)
        console.log(localite)
        console.log(entrepriseType)
        console.log(ethique)
        let result=await db.query('Select * from offre WHERE id_offre IN (?)', [taux])
        return (result)
    }

    static getTauxFilter(id) {
        return new Promise((next) => {
            let filtre = 0
            let list = []
            db.query('Select * from filtre_postulant WHERE id_filtre= ?', [id])
                .then((result) => {
                    filtre = result[0].id_taux_max
                })
                .then(() => {
                    db.query('Select id_offre from offre WHERE id_taux<= ?', [filtre])
                        .then((result) => {
                            for (let i = 0; i < result.length; i++) {
                                console.log(result[i].id_offre)
                                list.push(result[i].id_offre)
                            }
                            console.log("getTaux")
                            console.log(list)
                            next(list)
                        })
                })
        })
    }

    static getDispoFilter(id) {
        return new Promise((next) => {
            let filtre = 0
            let list = []
            db.query('Select * from filtre_postulant WHERE id_filtre= ?', [id])
                .then((result) => {
                    filtre = result[0].id_disponibilite
                })
                .then(() => {
                    db.query('Select id_offre from offre WHERE id_dispo>= ?', [filtre])
                        .then((result) => {
                            for (let i = 0; i < result.length; i++) {
                                console.log(result[i].id_offre)
                                list.push(result[i].id_offre)
                            }
                            console.log("getDispo")
                            console.log(list)
                            next(list)
                        })
                })
        })
    }
    getContratFilter(id) {
        return new Promise((next) => {
            db.query('Select * from filtre_contrat WHERE id_filtre= ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    }
                    else {
                        next(new Error("Error 400 Not Found"))
                    }
                })
                .catch((err) => next(err))

        })

    }
    getLocaliteFilter(id) {
        return new Promise((next) => {
            db.query('Select * from filtre_localite WHERE id_filtre= ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    }
                    else {
                        next(new Error("Error 400 Not Found"))
                    }
                })
                .catch((err) => next(err))

        })
    }
    getTypeFilter(id) {
        return new Promise((next) => {
            db.query('Select * from filtre_type_entreprise WHERE id_filtre= ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    }
                    else {
                        next(new Error("Error 400 Not Found"))
                    }
                })
                .catch((err) => next(err))

        })
    }
    getEthiqueFilter(id) {
        return new Promise((next) => {
            db.query('Select * from filtre_ethique WHERE id_filtre= ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    }
                    else {
                        next(new Error("Error 400 Not Found"))
                    }
                })
                .catch((err) => next(err))

        })
    }
    static GetFilterListEntreprise() {

    }
}