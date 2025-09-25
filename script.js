const cart = [];
const cartInfo = document.getElementById("cart-info");
const shippingCountry = document.getElementById("shipping-country");
const checkoutBtn = document.getElementById("checkout-btn");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", e => {
    const productDiv = e.target.closest(".product");
    const name = productDiv.dataset.name;
    const price = parseFloat(productDiv.dataset.price);

    cart.push({ name, price });

    alert(`${name} has been successfully added to your cart!`);
    cartInfo.textContent = `Cart: ${cart.length} items`;
  });
});

checkoutBtn.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const response = await fetch("https://YOUR_BACKEND_URL_HERE/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        shippingCountry: shippingCountry.value
      })
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
    else alert("Checkout failed, please try again.");
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
});
