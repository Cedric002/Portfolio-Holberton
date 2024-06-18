document.addEventListener('DOMContentLoaded', () => {
    const photoGallery = document.getElementById('photo-gallery');

    photoGallery.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const idArticle = event.target.getAttribute('data-id-article');
            fetch('/supprimer-du-panier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idArticle })
            })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                // Supprimez l'élément de l'article du DOM ou actualisez la page pour refléter le changement
                event.target.parentElement.remove();
            })
            .catch(error => console.error('Erreur:', error));
        }
    });
});
