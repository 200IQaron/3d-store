const products = [
  { name: "Key Holder", price: 1.5 },
  { name: "Pen Holder", price: 3.5 },
  { name: "Desk Organizer", price: 3.5 },
  { name: "Phone Stand", price: 2.5 },
  { name: "Cable Clips", price: 1.5 },
  { name: "Clip to Desk Head Stand", price: 4.5 },
  { name: "Pocket Copter", price: 2.0 },
  { name: "BMW Keychain", price: 1.5 },
  { name: "SD & MicroSD Holder", price: 3.5 },
  { name: "Lehtisaari Keychain", price: 5.0 }
];

let cart = [];

const productsContainer = document.getElementById('products');
const cartButton = document.getElementById('cart-button');
const cartElement = document.getElementById('cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const closeCartButton = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const notification = document.getElementById('notification');

// Render products
products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p>€${product.price.toFixed(2)}</p>
    <button>Add to Cart</button>
  `;
  div.querySelector('button').addEventListener('click', () => addToCart(product));
  productsContainer.appendChild(div);
});

// Add to cart
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  updateCart();
  showNotification(`${product.name} has been successfully added to your cart`);
}

// Update cart display
function updateCart() {
  cartItemsElement.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - €${(item.price*item.quantity).toFixed(2)}`;
    cartItemsElement.appendChild(li);
  });
  cartTotalElement.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 2000);
}

// Cart toggle
cartButton.addEventListener('click', () => cartElement.classList.add('active'));
closeCartButton.addEventListener('click', () => cartElement.classList.remove('active'));

// Checkout
checkoutButton.addEventListener('click', async () => {
  if (cart.length === 0) return alert("Cart is empty!");

  try {
    const response = await fetch('https://3dtoystore-backend-production-b64c.up.railway.app/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
    else alert("Checkout failed");
  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  }
});

