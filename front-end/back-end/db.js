const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'votre_host',
  user     : 'ismaelj31300@gmail.com',
  password : 'Ninine31300!',
  database : 'votre_base_de_donnees'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = connection;
