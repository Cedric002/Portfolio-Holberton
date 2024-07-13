document.addEventListener('DOMContentLoaded', () => {
    const sellButton = document.getElementById('sellButton');
    const photoUpload = document.getElementById('photo-upload');

    sellButton.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const mark = document.getElementById('mark').value;
        const status = document.getElementById('status').value;
        const price = document.getElementById('price').value;
        const category = document.getElementById('category').value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            alert('Veuillez vous connecter pour publier un article.');
            return;
        }

        if (!title || !description || !mark || !status || !price || !category) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        let photoUrl = '';
        if (photoUpload.files && photoUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoUrl = e.target.result;
                savePublication(title, description, mark, status, price, category, photoUrl, user);
            };
            reader.readAsDataURL(photoUpload.files[0]);
        } else {
            savePublication(title, description, mark, status, price, category, photoUrl, user);
        }
    });

    function savePublication(title, description, mark, status, price, category, photoUrl, user) {
        const publication = {
            title,
            description,
            mark,
            status,
            price,
            category,
            photoUrl,
            user: {
                name: user.prenom + ' ' + user.nom,
                email: user.email
            }
        };

        let publications = JSON.parse(localStorage.getItem(category)) || [];
        publications.push(publication);
        localStorage.setItem(category, JSON.stringify(publications));

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('mark').value = '';
        document.getElementById('status').value = '';
        document.getElementById('price').value = '';
        document.getElementById('category').value = '';
        document.getElementById('photo-upload').value = '';
        
        alert('Publication ajoutée avec succès!');
        window.location.href = $('#sellButton').attr('href');
    }

    const photoUploadInput = document.getElementById('photo-upload');
    const photoContainer = document.getElementById('photo-container');

    photoUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.className = 'uploaded-photo';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.className = 'delete-photo';
                deleteButton.addEventListener('click', () => {
                    photoContainer.innerHTML = '';
                    photoUploadInput.value = '';
                });

                photoContainer.innerHTML = '';
                photoContainer.appendChild(imgElement);
                photoContainer.appendChild(deleteButton);
            };
            reader.readAsDataURL(file);
        }
    });
});
