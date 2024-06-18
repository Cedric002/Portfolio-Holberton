<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour ajouter un utilisateur
function ajouterUtilisateur($nom, $prenom, $email, $mot_de_passe) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nom, $prenom, $email, password_hash($mot_de_passe, PASSWORD_DEFAULT)]);
}

// Fonction pour vérifier les informations de connexion
function verifierUtilisateur($email, $mot_de_passe) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($utilisateur && password_verify($mot_de_passe, $utilisateur['mot_de_passe'])) {
        // L'utilisateur est authentifié
        return true;
    }
    return false;
}

// Exemple d'utilisation
// ajouterUtilisateur('John', 'Doe', 'john.doe@example.com', 'password123');
// if (verifierUtilisateur('john.doe@example.com', 'password123')) {
//     echo "Connexion réussie";
// } else {
//     echo "Échec de la connexion";
// }
?>

