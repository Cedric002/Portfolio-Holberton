document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le panier depuis localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fonction pour afficher le panier
    function displayCart() {
        const cartContainer = document.getElementById('cartContainer');
        cartContainer.innerHTML = ''; // Vider le conteneur

        cart.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('span');
            productPrice.textContent = `Prix: ${product.price} €`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', () => {
                removeFromCart(product.id); // Appeler la fonction pour supprimer du panier
            });

            productCard.appendChild(productName);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);
            productCard.appendChild(deleteButton);

            cartContainer.appendChild(productCard);
        });
    }

    // Fonction pour supprimer un produit du panier
    function removeFromCart(productId) {
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Mettre à jour l'affichage du panier
    }

    // Afficher le panier au chargement de la page
    displayCart();

    // Autres fonctionnalités du panier (passer commande, vider le panier, etc.) à implémenter
    //passer commande
   



});
