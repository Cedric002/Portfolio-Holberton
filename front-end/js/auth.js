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
        const response = await fetch('http://5.39.34.46:3000/api/register', {
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
        const response = await fetch('http://5.39.34.46:3000/api/login', {
            method: 'POST',
            headers: secureHeaders,
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Connexion réussie');
            localStorage.setItem('token', data.token);

            localStorage.setItem('user', JSON.stringify(data.user));


            window.location.href = 'Accueil.html'; // Redirection vers la page d'accueil après connexion
        } else {
            const errorText = await response.text();
            alert('Erreur de connexion: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error); 
        alert('Erreur de connexion');
    }
});

// Déconnexion automatique après 5 heures
const AUTO_LOGOUT_TIME = 5 * 60 * 60 * 1000; // 5 heures en millisecondes

function checkAutoLogout() {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
        const currentTime = new Date().getTime();
        if (currentTime - loginTime > AUTO_LOGOUT_TIME) {
            localStorage.clear();
            alert('Votre session a expiré. Veuillez vous reconnecter.');
            window.location.href = 'connexion.html';
        }
    }
}

function displayUserDetails() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userDetails = document.getElementById('userDetails');
    const userEmailSpan = document.getElementById('userEmail');
    const userNameSpan = document.getElementById('userName');
    const loginLink = document.getElementById('loginLink');

    if (userEmail && userName) {
        userEmailSpan.textContent = userEmail;
        userNameSpan.textContent = userName;
        userDetails.style.display = 'block';
        loginLink.style.display = 'none';
    } else {
        userDetails.style.display = 'none';
        loginLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAutoLogout();
    displayUserDetails();

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.clear();
            window.location.href = 'connexion.html';
        });
    }
});
