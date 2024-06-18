<?php
// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=nom_de_la_base', 'utilisateur', 'mot_de_passe');

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collecter les données du formulaire
    $titre = $_POST['titre'];
    $description = $_POST['description'];
    $marque = $_POST['marque'];
    $etat = $_POST['etat'];
    $prix = $_POST['prix'];
    $photo = ''; // Initialiser le chemin de la photo

    // Traiter l'upload de la photo ici...

    // Préparer la requête SQL pour insérer l'article
    $stmt = $pdo->prepare("INSERT INTO articles_a_vendre (titre, description, marque, etat, prix, photo) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$titre, $description, $marque, $etat, $prix, $photo]);

    echo "Article ajouté avec succès.";
}
?>

