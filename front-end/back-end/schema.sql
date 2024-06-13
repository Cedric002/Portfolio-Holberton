CREATE TABLE Utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  mot_de_passe VARCHAR(255),
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT,
  titre VARCHAR(255),
  description TEXT,
  marque VARCHAR(255),
  etat VARCHAR(255),
  prix DECIMAL(10, 2),
  date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES Utilisateurs(id)
);

CREATE TABLE Images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id INT,
  chemin VARCHAR(255),
  date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES Articles(id)
);
