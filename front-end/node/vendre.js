const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/vendre-article', upload.single('photo'), (req, res) => {
    const { title, description, mark, status, price } = req.body;
    const photo = req.file;
    // Traiter les informations de l'article ici
    // Par exemple, sauvegarder dans une base de données et/ou un système de fichiers
    console.log('Article à vendre:', title, description, mark, status, price, photo);
    res.status(200).send('Article mis en vente avec succès');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
