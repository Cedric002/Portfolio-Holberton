document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalAmountElement = document.getElementById('total-amount');

    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            const itemPhoto = item.photoUrl ? `<img src="${item.photoUrl}" alt="${item.title}" class="cart-item-photo">` : '';

            itemDiv.innerHTML = `
                ${itemPhoto}
                <div class="cart-item-info">
                    <h2>${item.title}</h2>
                    <p>Description: ${item.description}</p>
                    <p>Marque: ${item.mark}</p>
                    <p>État: ${item.status}</p>
                    <p>Prix: ${item.price} €</p>
                </div>
                <div class="item-actions">
                    <button class="delete-button" data-title="${item.title}">✕</button>
                    <button class="buy-button">Acheter</button>
                </div>
            `;

            const deleteButton = itemDiv.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                deleteItemFromCart(item.title);
                displayCartItems();
            });

            const buyButton = itemDiv.querySelector('.buy-button');
            buyButton.addEventListener('click', () => {
                alert(`Merci pour votre achat de ${item.title} au prix de ${item.price} € !`);
            });

            cartItemsContainer.appendChild(itemDiv);
        });

        calculateTotal(cart);
    }

    function deleteItemFromCart(title) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.title !== title);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function calculateTotal(cart) {
        const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0);
        totalAmountElement.textContent = `Montant total: ${totalAmount.toFixed(2)} €`;
    }

    displayCartItems();
});
