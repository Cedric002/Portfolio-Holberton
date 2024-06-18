// JavaScript côté client
document.querySelector('.send-button').addEventListener('click', () => {
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value,
        }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    });
});
