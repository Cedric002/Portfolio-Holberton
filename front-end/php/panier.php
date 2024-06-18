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
    $stmt = $pdo->prepare("INSERT INTO paniers (utilisateur_id, article_id, quantite) VALUES (?, ?, ?)");
    $stmt->execute([$utilisateur_id, $article_id, $quantite]);
}

// Fonction pour obtenir le panier d'un utilisateur
function obtenirPanier($utilisateur_id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM paniers WHERE utilisateur_id = ?");
    $stmt->execute([$utilisateur_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Exemple d'utilisation
// ajouterAuPanier(1, 2, 1);
// $panier = obtenirPanier(1);
?>

