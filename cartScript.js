function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    
    cart.push({ name: productName, price: productPrice });
    totalAmount += productPrice;

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    
    displayCart();
    showMessage(`Your product is added to cart. (${cart.length})`);
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (cartItems && totalAmountElement) {
        cartItems.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="delete-btn" onclick="removeFromCart(${index})">Delete</button></td>
            `;
            cartItems.appendChild(row);
        });

        totalAmountElement.textContent = totalAmount.toFixed(2);
    }
}

/* *******r********** SHOW MASSAGE ************************ */
function showMessage(messageText) {
    const messageContainer = document.getElementById('messageContainer');
    const message = document.createElement('div');
    message.className = 'message';
    message.innerText = messageText;

    messageContainer.appendChild(message);

    setTimeout(() => {
        message.classList.add('hide');
        setTimeout(() => {
            messageContainer.removeChild(message);
        }, 500);
    }, 2000);
}
/* *******r********** SHOW MASSAGE END ************************ */

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (cart[index]) {
        totalAmount -= cart[index].price;
        cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalAmount', totalAmount.toFixed(2));
        
        displayCart();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('totalAmount');

    displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});
