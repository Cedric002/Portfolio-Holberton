document.addEventListener('DOMContentLoaded', () => {
    const sellButton = document.querySelector('.sell');
    sellButton.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const mark = document.getElementById('mark').value;
        const status = document.getElementById('status').value;
        const price = document.getElementById('price').value;
        const photo = document.getElementById('photo-upload').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('mark', mark);
        formData.append('status', status);
        formData.append('price', price);
        formData.append('photo', photo);

        fetch('/vendre-article', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(text => console.log(text))
        .catch(error => console.error('Erreur:', error));
    });
});
