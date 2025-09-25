body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
}

header {
  background: #212529;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

#cart-button {
  cursor: pointer;
  font-weight: bold;
}

main {
  padding: 2rem;
}

#products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.product {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.product h3 {
  margin-top: 0.5rem;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

#cart {
  margin-top: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

footer {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  background: #343a40;
  color: white;
}
