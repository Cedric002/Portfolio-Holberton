-- Création de la table des utilisateurs
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL
);

-- Création de la table des articles
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    marque VARCHAR(100),
    etat VARCHAR(100),
    prix DECIMAL(10, 2) NOT NULL,
    photo VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Création de la table des achats
CREATE TABLE achats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    article_id INT NOT NULL,
    date_achat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);

