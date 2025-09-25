const products = [
  { name: "Key Holder", price: 1.50 },
  { name: "Pen Holder", price: 3.50 },
  { name: "Desk Organizer", price: 3.50 },
  { name: "Phone Stand", price: 2.50 },
  { name: "Cable Clips", price: 1.50 },
  { name: "Clip to Desk Head Stand", price: 4.50 },
  { name: "Pocket Copter", price: 2.00 },
  { name: "BMW Keychain", price: 1.50 },
  { name: "SD/MicroSD Holder", price: 3.50 },
  { name: "Lehtisaari Keychain", price: 5.00 }
];

let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  cartDiv.textContent = `Cart (${totalItems} items) - €${totalPrice}`;
}

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  updateCartDisplay();
  alert(`${product.name} has been successfully added to your cart.`);
}

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `<h3>${product.name}</h3><p>€${product.price.toFixed(2)}</p>`;
  const btn = document.createElement("button");
  btn.textContent = "Add to Cart";
  btn.onclick = () => addToCart(product);
  card.appendChild(btn);
  productsDiv.appendChild(card);
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
  if (cart.length === 0) return alert("Your cart is empty!");
  try {
    const res = await fetch("https://3dtoystore-backend-production-b64c.up.railway.app/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });
    const data = await res.json();
    window.location.href = data.url;
  } catch (err) {
    alert("Error creating checkout session. Try again.");
    console.error(err);
  }
});
