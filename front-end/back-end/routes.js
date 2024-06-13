const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Importation du fichier de connexion à la base de données
const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ici, vous pouvez ajouter vos routes

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
