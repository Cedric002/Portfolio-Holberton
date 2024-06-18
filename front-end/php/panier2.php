<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour ajouter un article au panier
function ajouterAuPanier($utilisateur_id, $article_id, $quantite) {
    global $pdo;
    $
