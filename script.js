let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    alert(name + " has been added to your cart!");
    updateCartDisplay();
}

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
