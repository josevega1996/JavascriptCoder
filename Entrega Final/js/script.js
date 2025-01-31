// Variables globales
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('totalAmount');

// Cargar productos desde la API
async function loadProducts() {
    try {
        console.log('Starting to load products...'); 
        showLoadingState();
        
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const savedProducts = JSON.parse(localStorage.getItem('products'));
        
        products = data.map(item => {
            const savedProduct = savedProducts?.find(p => p.id === item.id);
            return {
                id: item.id,
                name: item.title,
                price: item.price,
                stock: savedProduct?.stock ?? Math.floor(Math.random() * 10) + 1,
                description: item.description.substring(0, 100) + '...',
                image: item.image
            };
        });
        

        localStorage.setItem('products', JSON.stringify(products));
        
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        productList.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-600 text-lg">Error loading products. Please try again later.</p>
            </div>
        `;
    }
}

function displayProducts() {
    if (!products.length) {
        productList.innerHTML = '<p>No products available</p>';
        return;
    }

    productList.innerHTML = products.map(product => {
        const { id, name, price, stock, description, image } = product;
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${image}" alt="${name}" class="w-full h-48 object-contain bg-white p-4">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">${name}</h3>
                    <p class="text-gray-600 mb-2">${description}</p>
                    <p class="text-lg font-bold text-gray-800 mb-2">$${price.toFixed(2)}</p>
                    <p class="text-sm text-gray-600 mb-3">Stock: ${stock}</p>
                    ${stock > 0 ? 
                        `<button onclick="addToCart(${id})"
                         class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Add to Cart
                         </button>` : 
                        `<p class="text-red-500 text-center font-semibold">Out of Stock</p>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    const product = products[productIndex];

    if (product.stock > 0) {
        // Aqui actualiza el stock 
        products[productIndex].stock -= 1;
        localStorage.setItem('products', JSON.stringify(products));

        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            cart = cart.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            cart = [...cart, { ...product, quantity: 1 }];
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        displayProducts();

        Swal.fire({
            title: 'Ani!',
            text: `${product.name} has been added to your cart`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            title: 'Out of Stock',
            text: `Sorry, ${product.name} is currently out of stock`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}

function updateCartDisplay() {
    cartItems.innerHTML = cart.map(item => {
        const { id, name, price, quantity, image } = item;
        return `
            <div class="flex items-center gap-4 border-b border-gray-200 py-4">
                <img src="${image}" alt="${name}" class="w-16 h-16 object-contain bg-gray-50">
                <div class="flex-grow">
                    <h4 class="font-semibold text-gray-800">${name}</h4>
                    <p class="text-gray-600">$${price.toFixed(2)} x ${quantity}</p>
                </div>
                <button onclick="removeFromCart(${id})"
                        class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300">
                    Remove
                </button>
            </div>
        `;
    }).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    const removedItem = cart.find(item => item.id === productId);
    if (removedItem) {
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products[productIndex].stock += removedItem.quantity;
            localStorage.setItem('products', JSON.stringify(products));
        }
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        

        updateCartDisplay();
        displayProducts();

        Swal.fire({
            title: 'Removido del carrito',
            text: `${removedItem.name} ha sido removido del carrito`,
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

function showLoadingState() {
    productList.innerHTML = `
        <div class="col-span-full text-center py-12">
            <p class="text-gray-600 text-lg">Loading products...</p>
        </div>
    `;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartDisplay();
});