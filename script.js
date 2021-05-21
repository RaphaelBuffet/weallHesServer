var mysql = require('mysql');
var con = mysql.createConnection({
    host: "node65282-env-2758730.jcloud-ver-jpc.ik-server.com",
    database: "spc07tfhbp7shb2h",
    user: "root",
    password: "NTRrna40329"
});
con.connect(function(err) {
 if (err) throw err;
 console.log("You are connected!");
});
con.end();