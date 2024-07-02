document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nom = document.getElementById('register-nom').value;
    const prenom = document.getElementById('register-prenom').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('http://5.39.34.46:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, prenom, email, password })
        });

        if (response.ok) {
            alert('Inscription réussie');
            window.location.href = 'connexion.html'; // Redirige vers la page de connexion après l'inscription
        } else {
            const errorText = await response.text();
            alert('Erreur d\'inscription: ' + errorText);
            widows.location.href = 'Accueil.html'   // Redirige vers la page d'accueil en cas d'erreur
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erreur d\'inscription');
        window.location.href = 'Accueil.html'; // Redirige vers la page d'accueil en cas d'erreur
    }
});
