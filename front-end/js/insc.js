document.querySelector('.login button[type="submit"]').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/api/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nom: document.querySelector('#nom').value,
            prenom: document.querySelector('#prenom').value,
            email: document.querySelector('#email').value,
            motdepasse: document.querySelector('#motdepasse').value,
        }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    });
});

document.querySelector('.connexion button[type="submit"]').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/api/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('.connexion #email').value,
            motdepasse: document.querySelector('.connexion #motdepasse_connexion').value,
        }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    });
});
