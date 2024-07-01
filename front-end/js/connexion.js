document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://5.39.34.46:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Connexion réussie');
            window.location.href = 'Accueil.html'; // Redirige vers la page d'accueil après la connexion
        } else {
            const errorText = await response.text();
            alert('Erreur de connexion: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erreur de connexion');
        window.location.href = 'Accueil.html'; // Redirige vers la page de connexion en cas d'erreur
    }
});
