let cart = [];

function updateCartDisplay() {
    const cartDiv = document.getElementById('cart');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    cartDiv.textContent = `Cart (${totalItems} items) - €${totalPrice}`;
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.background = '#28a745';
    notif.style.color = 'white';
    notif.style.padding = '10px 15px';
    notif.style.borderRadius = '5px';
    notif.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    notif.style.zIndex = '1000';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('h2').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('€',''));
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();
        showNotification(`${name} has been successfully added to your cart!`);
    });
});

// Checkout button (click cart to checkout)
document.getElementById('cart').addEventListener('click', async () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        const response = await fetch('https://3dtoystore-backend-production-b64c.up.railway.app/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
        });
        const data = await response.json();
        window.location.href = data.url;
    } catch (error) {
        alert("Error creating checkout session. Try again!");
        console.error(error);
    }
});
