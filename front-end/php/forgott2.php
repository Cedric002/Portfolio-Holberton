<?php
// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=your_host;dbname=your_db_name', 'your_username', 'your_password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// Fonction pour créer une demande de réinitialisation de mot de passe
function creerDemandeReinitialisation($email) {
    global $pdo;
    $token = bin2hex(random_bytes(32)); // Générer un token sécurisé
    $date_expiration = date('Y-m-d H:i:s', strtotime('+1 hour')); // Le token expire après 1 heure

    $stmt = $pdo->prepare("INSERT INTO reinitialisation_mdp (email, token, date_expiration) VALUES (?, ?, ?)");
    $stmt->execute([$email, $token, $date_expiration]);

    // Envoyer l'email avec le token ici...
}

// Exemple d'utilisation
// creerDemandeReinitialisation('john.doe@example.com');
?>

