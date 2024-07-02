// JavaScript + Node.js
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.static('public')); // pour servir vos fichiers statiques HTML, CSS et JS

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nom_de_la_base_de_donnees'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connecté à la base de données');
});

// API
app.get('/api', (req, res) => {
    let sql = 'SELECT * FROM votre_table';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log('Serveur démarré sur le port 3000');
});
