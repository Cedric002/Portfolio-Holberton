<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour ajouter une demande de contact
function ajouterDemandeContact($nom, $prenom, $email, $message) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO demandes_contact (nom, prenom, email, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nom, $prenom, $email, $message]);
}

// Exemple d'utilisation
// ajouterDemandeContact('John', 'Doe', 'john.doe@example.com', 'Besoin d'aide pour...');
?>

