const cartBtn = document.getElementById('cart-btn');
const cart = document.getElementById('cart');
const closeCart = document.getElementById('close-cart');
const addButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

let cartData = [];

cartBtn.addEventListener('click', () => cart.classList.add('open'));
closeCart.addEventListener('click', () => cart.classList.remove('open'));

addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    cartData.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cartData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cartData.length;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert(`Total: €${cartTotal.textContent}\nRedirecting to payment link...`);
  // Optional: redirect all items to your payment page here
  cartData = [];
  updateCart();
  cart.classList.remove('open');
});
