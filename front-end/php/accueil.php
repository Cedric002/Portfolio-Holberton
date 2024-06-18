<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour ajouter un utilisateur
function ajouterUtilisateur($nom, $email, $mot_de_passe) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)");
    $stmt->execute([$nom, $email, password_hash($mot_de_passe, PASSWORD_DEFAULT)]);
}

// Fonction pour ajouter un article
function ajouterArticle($utilisateur_id, $titre, $description, $marque, $etat, $prix, $photo) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO articles (utilisateur_id, titre, description, marque, etat, prix, photo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$utilisateur_id, $titre, $description, $marque, $etat, $prix, $photo]);
}

// Fonction pour enregistrer un achat
function enregistrerAchat($utilisateur_id, $article_id) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO achats (utilisateur_id, article_id) VALUES (?, ?)");
    $stmt->execute([$utilisateur_id, $article_id]);
}

// Exemple d'utilisation
// ajouterUtilisateur('John Doe', 'john.doe@example.com', 'password123');
// ajouterArticle(1, 'Chaise ancienne', 'Une belle chaise de style vintage', 'Artisan', 'Bon état', 75.00, 'chemin/vers/la/photo.jpg');
// enregistrerAchat(1, 1);
?>

