-- Création de la table des paniers
CREATE TABLE paniers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    article_id INT NOT NULL,
    quantite INT NOT NULL DEFAULT 1,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);

