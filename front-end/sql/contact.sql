-- Création de la table des demandes de contact
CREATE TABLE demandes_contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    message TEXT,
    date_demande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

