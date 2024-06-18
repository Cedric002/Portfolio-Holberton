<?php
// Connexion à la base de données
$pdo = new PDO('mysql:host=your_host;dbname=your_db', 'username', 'password');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    // Vérifier si l'email existe dans la base de données
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user) {
        http_response_code(404);
        echo 'Aucun utilisateur trouvé avec cet email.';
        exit;
    }
    // Générer un token de réinitialisation et l'envoyer par email (implémentation de l'envoi d'email non montrée ici)
    // Sauvegarder le token dans la base de données avec une date d'expiration
    // ...
    echo 'Un email de réinitialisation a été envoyé.';
}
?>
