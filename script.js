// Simple alert when the contact form is submitted
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    this.reset();
});

// Optional: Add a simple cart counter if you use PayPal buttons
let cartCount = 0;
const buttons = document.querySelectorAll("form input[type='submit']");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        cartCount++;
        console.log("Items in cart:", cartCount);
    });
});
