// Sécurisation des requêtes côté client avec des headers de sécurité
const secureHeaders = new Headers();
secureHeaders.append('Content-Type', 'application/json');
secureHeaders.append('X-Requested-With', 'XMLHttpRequest');

// Inscription utilisateur
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nom = document.getElementById('register-nom').value;
    const prenom = document.getElementById('register-prenom').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: secureHeaders,
            body: JSON.stringify({ nom, prenom, email, password })
        });

        if (response.ok) {
            alert('Inscription réussie');
            window.location.href = 'connexion.html'; // Redirection vers la page de connexion après inscription
        } else {
            const errorText = await response.text();
            alert('Erreur d\'inscription: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erreur d\'inscription');
    }
});

// Connexion utilisateur
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: secureHeaders,
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Connexion réussie');
            window.location.href = 'accueil.html'; // Redirection vers la page d'accueil après connexion
        } else {
            const errorText = await response.text();
            alert('Erreur de connexion: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error); 
        alert('Erreur de connexion');
    }
});