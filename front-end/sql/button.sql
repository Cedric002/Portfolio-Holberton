CREATE TABLE articles_a_vendre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    marque VARCHAR(100),
    etat VARCHAR(100),
    prix DECIMAL(10, 2) NOT NULL,
    photo VARCHAR(255),
    date_mise_en_vente TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

