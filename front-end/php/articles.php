<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour ajouter une catégorie
function ajouterCategorie($nom) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO categories (nom) VALUES (?)");
    $stmt->execute([$nom]);
}

// Fonction pour ajouter un article
function ajouterArticle($categorie_id, $titre, $description, $prix, $photo) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO articles (categorie_id, titre, description, prix, photo) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$categorie_id, $titre, $description, $prix, $photo]);
}

// Exemple d'utilisation
// ajouterCategorie('Objet');
// ajouterCategorie('Jeux');
// ajouterArticle(1, 'Lampe vintage', 'Une belle lampe des années 50', 20.00, 'chemin/vers/la/photo.jpg');
?>

