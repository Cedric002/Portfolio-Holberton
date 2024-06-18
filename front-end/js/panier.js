document.addEventListener('DOMContentLoaded', (event) => {
    const loginButton = document.querySelector('.button');

    // Supposons que vous ayez une fonction 'estConnecte' qui vérifie si l'utilisateur est connecté
    function estConnecte() {
        // Cette fonction devrait vérifier quelque chose dans le stockage local ou les cookies
        // Par exemple, vérifier si un cookie de session existe
        return document.cookie.split(';').some((item) => item.trim().startsWith('session='));
    }

    loginButton.addEventListener('click', () => {
        // Vérifier si l'utilisateur est connecté
        if (!estConnecte()) {
            // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
            window.location.href = 'connexion.html';
        } else {
            // Si l'utilisateur est connecté, vous pouvez effectuer une action différente
            // Par exemple, ajouter un article au panier ou afficher un message
            console.log('L\'utilisateur est déjà connecté.');
        }
    });
});
