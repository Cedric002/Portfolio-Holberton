document.addEventListener('DOMContentLoaded', () => {
    const categories = ['objets', 'jeux', 'scolaire', 'maison', 'accessoires', 'outils'];

    categories.forEach(category => {
        const publicationsContainer = document.getElementById(`${category}-container`);
        const publications = JSON.parse(localStorage.getItem(category)) || [];

        function displayPublications() {
            publicationsContainer.innerHTML = ''; // Efface le contenu existant

            publications.forEach(publication => {
                const publicationDiv = createPublicationDiv(publication);
                publicationsContainer.appendChild(publicationDiv);
            });
        }

        function createPublicationDiv(publication) {
            const publicationDiv = document.createElement('div');
            publicationDiv.classList.add('publication');

            // Construction de la publication avec ou sans image
            const photo = publication.photoUrl ? `<img src="${publication.photoUrl}" alt="${publication.title}" class="publication-photo">` : '';

            publicationDiv.innerHTML = `
                ${photo}
                <h2>${publication.title}</h2>
                <p>${publication.description}</p>
                <p>Marque: ${publication.mark}</p>
                <p>État: ${publication.status}</p>
                <p>Prix: ${publication.price} €</p>
                <p>Publié par: ${publication.user.name} (${publication.user.email})</p>
            `;

            if (category === 'objets') {
                // Ajouter des boutons spécifiques pour la catégorie d'objets
                const contactButton = createContactButton(publication);
                publicationDiv.appendChild(contactButton);
            } else {
                // Ajouter un bouton générique pour les autres catégories
                const addToCartButton = createAddToCartButton(publication);
                publicationDiv.appendChild(addToCartButton);
            }

            return publicationDiv;
        }

        function createContactButton(publication) {
            const contactButton = document.createElement('button');
            contactButton.textContent = 'Contacter';
            contactButton.classList.add('contact-button');
            contactButton.addEventListener('click', () => {
                window.location.href = `mailto:${publication.user.email}`;
            });
            return contactButton;
        }

        function createAddToCartButton(publication) {
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Ajouter au panier';
            addToCartButton.classList.add('add-to-cart-button');
            addToCartButton.addEventListener('click', () => {
                addToCart(publication);
            });
            return addToCartButton;
        }

        function addToCart(publication) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(publication);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Article ajouté au panier');
        }

        displayPublications();
    });
});
