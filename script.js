// Product data
const products = [
    { id: 1, name: "Chocolate Cake", price: 25.99, image: "chocolate-cake.jpg", description: "Rich chocolate layers with ganache filling" },
    { id: 2, name: "Vanilla Cupcakes", price: 15.99, image: "vanilla-cupcakes.jpg", description: "Light and fluffy vanilla cupcakes with buttercream frosting" },
    { id: 3, name: "Red Velvet Cake", price: 28.99, image: "red-velvet-cake.jpg", description: "Classic red velvet cake with cream cheese frosting" },
    // Add more products as needed
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-product-details');
const closeModal = document.getElementsByClassName('close')[0];

// Display products on the home page
function displayProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="openProductModal(${product.id})">View Details</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" value="1" min="1">
        <label for="special-instructions">Special Instructions:</label>
        <textarea id="special-instructions"></textarea>
        <button onclick="addToBag(${product.id})">Add to Bag</button>
    `;
    modal.style.display = 'block';
}

// Close modal
closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Add item to bag
function addToBag(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    const specialInstructions = document.getElementById('special-instructions').value;

    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    bag.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        specialInstructions: specialInstructions
    });

    localStorage.setItem('bag', JSON.stringify(bag));
    alert(`${quantity} ${product.name}(s) added to your bag!`);
    modal.style.display = 'none';
}

// Display bag items
function displayBagItems() {
    const bagItemsContainer = document.getElementById('bag-items');
    const bagTotalContainer = document.getElementById('bag-total');
    const bag = JSON.parse(localStorage.getItem('bag')) || [];

    if (bag.length === 0) {
        bagItemsContainer.innerHTML = '<p>Your bag is empty.</p>';
        bagTotalContainer.innerHTML = '';
        return;
    }

    let total = 0;
    bagItemsContainer.innerHTML = '';
    bag.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        bagItemsContainer.innerHTML += `
            <div class="bag-item">
                <p>${item.name} x ${item.quantity}</p>
                <p>$${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromBag(${index})">Remove</button>
            </div>
        `;
    });

    bagTotalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Remove item from bag
function removeFromBag(index) {
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    bag.splice(index, 1);
    localStorage.setItem('bag', JSON.stringify(bag));
    displayBagItems();
}

// Display checkout items
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalContainer = document.getElementById('checkout-total');
    const bag = JSON.parse(localStorage.getItem('bag')) || [];

    if (bag.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your bag is empty.</p>';
        checkoutTotalContainer.innerHTML = '';
        return;
    }

    let total = 0;
    checkoutItemsContainer.innerHTML = '';
    bag.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        checkoutItemsContainer.innerHTML += `
            <div class="checkout-item">
                <p>${item.name} x ${item.quantity}</p>
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });

    checkoutTotalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Handle form submission
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your order! It has been placed successfully.');
        localStorage.removeItem('bag');
        window.location.href = 'index.html';
    });
}

// Initialize page
if (productGrid) {
    displayProducts();
}

if (document.getElementById('bag-items')) {
    displayBagItems();
}

if (document.getElementById('checkout-items')) {
    displayCheckoutItems();
}