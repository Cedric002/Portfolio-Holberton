// Node.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

// API pour enregistrer les informations de contact
app.post('/api/contact', (req, res) => {
    let sql = 'INSERT INTO contacts SET ?';
    let contact = {
        nom: req.body.nom,
        email: req.body.email,
        message: req.body.message
    };
    db.query(sql, contact, (err, result) => {
        if(err) throw err;
        res.send('Informations de contact enregistrées');
    });
});

app.listen('3000', () => {
    console.log('Serveur démarré sur le port 3000');
});
