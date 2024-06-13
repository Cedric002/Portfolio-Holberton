 //Fonction pour gérer la sélection du fichier
function handleFileSelect(event) {
    var files = event.target.files; // Récupère le fichier depuis l'input
    // Ici, vous pouvez ajouter le code pour traiter le fichier sélectionné
    console.log('Fichier sélectionné :', files[0].name);
}
