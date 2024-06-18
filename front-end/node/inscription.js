// JavaScript + Node.js
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

// API pour l'inscription
app.post('/api/inscription', (req, res) => {
    let sql = 'INSERT INTO utilisateurs SET ?';
    let utilisateur = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    };
    db.query(sql, utilisateur, (err, result) => {
        if(err) throw err;
        res.send('Inscription réussie');
    });
});

// API pour la connexion
app.post('/api/connexion', (req, res) => {
    let sql = 'SELECT * FROM utilisateurs WHERE email = ? AND motdepasse = ?';
    db.query(sql, [req.body.email, req.body.motdepasse], (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send('Connexion réussie');
        } else {
            res.send('Email ou mot de passe incorrect');
        }
    });
});

app.listen('3000', () => {
    console.log('Serveur démarré sur le port 3000');
});
