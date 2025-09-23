let cart = [];

// Add product to cart
function addToCart(name, price) {
    cart.push({ name, price });
    alert(name + " has been added to your cart!");
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        cartDiv.innerHTML += item.name + " - €" + item.price + "<br>";
        total += item.price;
    });
    cartDiv.innerHTML += "<strong>Total: €" + total + "</strong>";
}

// Simulate MobilePay for entire cart
function mobilePayCart() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert("This is a simulated MobilePay payment for €" + total + " for all items in your cart.");
}
