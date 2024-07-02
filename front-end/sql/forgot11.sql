-- Création de la table des demandes de réinitialisation de mot de passe
CREATE TABLE reinitialisation_mdp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_expiration DATETIME NOT NULL
);

