const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = 'ismaelj31300!'; // Clé secrète JWT

// Middleware pour parser le corps des requêtes JSON
app.use(bodyParser.json());

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware pour la connexion à la base de données MySQL
const pool = mysql.createPool({
  host: '5.39.34.46', // Adresse de votre base de données MySQL
  user: 'ismael', // Utilisateur de votre base de données MySQL
  password: 'isma313', // Mot de passe de votre base de données MySQL
  database: 'vide_grenier', // Nom de votre base de données MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware pour gérer les erreurs de connexion à la base de données
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  });

// Route d'inscription sécurisée
app.post('/api/register', async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
    
    if (results.length > 0) {
      connection.release();
      return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.query('INSERT INTO user (nom, prenom, email, password) VALUES (?, ?, ?, ?)', [nom, prenom, email, hashedPassword]);
    connection.release();
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Server error');
  }
});

// Route de connexion sécurisée
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

    if (results.length === 0) {
      connection.release();
      return res.status(400).send('Email or password incorrect');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      connection.release();
      return res.status(400).send('Email or password incorrect');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    connection.release();
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server error');
  }
});

// Middleware pour vérifier les tokens JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }

    req.userId = decoded.id;
    next();
  });
};

// Route pour récupérer les informations utilisateur après connexion
app.get('/api/userinfo', verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT id, nom, prenom, email FROM user WHERE id = ?', [userId]);
    connection.release();

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Server error');
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
