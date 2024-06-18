document.querySelectorAll('.place').forEach((element) => {
    element.addEventListener('click', () => {
        fetch(`/api/articles/${element.textContent}`)
            .then(response => response.json())
            .then(articles => {
                // Affichez les articles sur la page
            });
    });
});
