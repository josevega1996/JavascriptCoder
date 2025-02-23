// Products data
const products = [
  {
      id: 1,
      name: "Laptop",
      price: 999,
      stock: 5,
      description: "High-performance laptop"
  },
  {
      id: 2,
      name: "Smartphone",
      price: 699,
      stock: 8,
      description: "Latest model smartphone"
  },
  {
      id: 3,
      name: "Headphones",
      price: 199,
      stock: 12,
      description: "Wireless noise-canceling headphones"
  }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// This is for display local storage on console just to see what is on the cart
console.log(localStorage.getItem('cart'));

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('totalAmount');

// Display Products with Destructuring
function displayProducts() {
  productList.innerHTML = products.map(product => {
      const { id, name, price, stock, description } = product;
      return `
          <div class="product-card">
              <h3>${name}</h3>
              <p>${description}</p>
              <p>Price: $${price}</p>
              <p>Stock ${stock}</p>
              ${stock > 0 ? 
                `<button onclick="addToCart(${id})">Add to Cart</button>` : 
                `<p style="color: red;">Out of Stock</p>`
            }
          </div>
            `;
  }).join('');
}

// now we are goiin to create the function to add to cart

function addToCart(productId) {
    const productIndex = products.findIndex(p => p.id === productId);

    if (products[productIndex].stock > 0) {
        products[productIndex].stock -= 1;
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            cart = cart.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            const product = products[productIndex];
            cart = [...cart, { ...product, quantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        displayProducts();  
    }
}



// Update Cart Display
function updateCartDisplay() {
  cartItems.innerHTML = cart.map(item => {
      const { name, price, quantity } = item;
      return `
          <div class="cart-item">
              <h4>${name}</h4>
              <p>Price: $${price} x ${quantity}</p>
              <button onclick="removeFromCart(${item.id})">Remove</button>
          </div>
      `;
  }).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   this is the total amount of the cart and its called in the html
  totalAmount.textContent = total.toFixed(2);  
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateCartDisplay();
});