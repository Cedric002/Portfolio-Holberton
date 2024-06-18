function vendreArticle() {
    // Collecter les données du formulaire
    var titre = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var marque = document.getElementById('mark').value;
    var etat = document.getElementById('status').value;
    var prix = document.getElementById('price').value;
    var photo = document.getElementById('photo-upload').files[0];

    // Créer un objet FormData pour envoyer les données du formulaire
    var formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('marque', marque);
    formData.append('etat', etat);
    formData.append('prix', prix);
    formData.append('photo', photo);

    // Envoyer les données au serveur via AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'vendre_article.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            // Traiter la réponse du serveur ici
        }
    };
    xhr.send(formData);
}

