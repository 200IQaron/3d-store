// Products List
const products = [
  { name: "Key Holder", price: 1.50, img: "images/keyholder.jpg" },
  { name: "Pen Holder", price: 3.50, img: "images/penholder.jpg" },
  { name: "Desk Organizer", price: 3.50, img: "images/deskorganizer.jpg" },
  { name: "Phone Stand", price: 2.50, img: "images/phonestand.jpg" },
  { name: "Cable Clips", price: 1.50, img: "images/cableclips.jpg" },
  { name: "Clip to Desk Head Stand", price: 4.50, img: "images/clipheadstand.jpg" },
  { name: "Pocket Copter", price: 2.00, img: "images/pocketcopter.jpg" },
  { name: "BMW Keychain", price: 1.50, img: "images/bmwkeychain.jpg" },
  { name: "SD & MicroSD Holder", price: 3.50, img: "images/sdholder.jpg" },
  { name: "Lehtisaari Keychain", price: 5.00, img: "images/lehtisaari.jpg" },
];

const cart = [];

// Render Products
const productsContainer = document.getElementById("products-container");
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>€${product.price.toFixed(2)}</p>
    <button>Add to Cart</button>
  `;
  div.querySelector("button").addEventListener("click", () => {
    cart.push(product);
    alert(`${product.name} has been successfully added to your cart.`);
  });
  productsContainer.appendChild(div);
});

// Checkout Button
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const res = await fetch("https://3dtoystore-backend-production-b64c.up.railway.app/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Go to Stripe checkout
    } else {
      alert("Error creating checkout session.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to checkout. Try again.");
  }
});
