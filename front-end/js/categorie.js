document.addEventListener('DOMContentLoaded', () => {
    const category = 'objets'; // Remplacez par la catégorie appropriée
    const publicationsContainer = document.getElementById('publications-container');

    const publications = JSON.parse(localStorage.getItem(category)) || [];
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Fonction pour afficher toutes les publications
    function displayPublications() {
        publicationsContainer.innerHTML = ''; // Efface le contenu existant

        publications.forEach(publication => {
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

            // Bouton Contacter
            const contactButton = document.createElement('button');
            contactButton.textContent = 'Contacter';
            contactButton.classList.add('contact-button');
            contactButton.addEventListener('click', () => {
                window.location.href = `mailto:${publication.user.email}`;
            });
            publicationDiv.appendChild(contactButton);

            // Bouton Modifier (visible uniquement pour l'utilisateur connecté qui a publié l'annonce)
            if (currentUser && currentUser.email === publication.user.email) {
                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', () => {
                    editPublication(publication, publicationDiv);
                });
                publicationDiv.appendChild(editButton);

                // Bouton Supprimer
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deletePublication(publication, publicationDiv);
                });
                publicationDiv.appendChild(deleteButton);
            }

            // Bouton Ajouter au panier (visible uniquement pour les utilisateurs connectés qui n'ont pas publié l'annonce)
            if (currentUser && currentUser.email !== publication.user.email) {
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Ajouter au panier';
                addToCartButton.classList.add('add-to-cart-button');
                addToCartButton.addEventListener('click', () => {
                    addToCart(publication);
                });
                publicationDiv.appendChild(addToCartButton);
            }

            publicationsContainer.appendChild(publicationDiv);
        });
    }

    // Fonction pour éditer une publication
    function editPublication(publication, publicationDiv) {
        // Création des champs de saisie pour modifier la publication
        const titleInput = createInput('text', publication.title);
        const descriptionInput = createTextarea(publication.description);
        const markInput = createInput('text', publication.mark);
        const statusInput = createInput('text', publication.status);
        const priceInput = createInput('number', publication.price);

        // Remplacement des éléments HTML actuels par les champs de saisie
        replaceElement(publicationDiv, 'h2', titleInput);
        replaceElement(publicationDiv, 'p', descriptionInput);
        replaceElement(publicationDiv, 'p', markInput);
        replaceElement(publicationDiv, 'p', statusInput);
        replaceElement(publicationDiv, 'p', priceInput);

        // Création du bouton pour sauvegarder les modifications
        const saveChangesButton = document.createElement('button');
        saveChangesButton.textContent = 'Enregistrer les modifications';
        saveChangesButton.classList.add('save-changes-button');
        saveChangesButton.addEventListener('click', () => {
            // Mettre à jour les valeurs de la publication avec les nouvelles valeurs saisies
            publication.title = titleInput.value;
            publication.description = descriptionInput.value;
            publication.mark = markInput.value;
            publication.status = statusInput.value;
            publication.price = priceInput.value;

            // Mettre à jour les données dans localStorage
            localStorage.setItem(category, JSON.stringify(publications));

            // Mettre à jour l'affichage de la publication
            displayPublications();
        });
        publicationDiv.appendChild(saveChangesButton);

        // Supprimer le bouton Modifier
        publicationDiv.removeChild(publicationDiv.querySelector('.edit-button'));
    }

    // Fonction pour supprimer une publication
    function deletePublication(publication, publicationDiv) {
        const index = publications.indexOf(publication);
        if (index !== -1) {
            publications.splice(index, 1);
            localStorage.setItem(category, JSON.stringify(publications));
            publicationDiv.remove();
        }
    }

    // Fonction pour ajouter une publication au panier
    function addToCart(publication) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(publication);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Article ajouté au panier');
    }

    // Fonction utilitaire pour créer un élément de saisie
    function createInput(type, value) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('value', value);
        return input;
    }

    // Fonction utilitaire pour créer une zone de texte (textarea)
    function createTextarea(value) {
        const textarea = document.createElement('textarea');
        textarea.textContent = value;
        return textarea;
    }

    // Fonction utilitaire pour remplacer un élément par un autre
    function replaceElement(parent, elementType, newElement) {
        parent.replaceChild(newElement, parent.querySelector(elementType));
    }

    // Appel initial pour afficher les publications
    displayPublications();
});
