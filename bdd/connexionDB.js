/**
 * rename to connexionDB.js
 */
const config = require('../assets/config')
module.exports = { getCon:doRequestSql };

function doRequestSql(){
    let mysql = require('mysql');
    return mysql.createConnection({
        host: config.db.host,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password
    });
}

