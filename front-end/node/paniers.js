const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.post('/ajouter-au-panier', (req, res) => {
    const { idProduit } = req.body;
    if (!req.session.panier) {
        req.session.panier = [];
    }
    req.session.panier.push(idProduit);
    res.send('Produit ajouté au panier');
});

app.get('/mon-panier', (req, res) => {
    res.send(req.session.panier || []);
});

// ... Autres routes et logique serveur

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
