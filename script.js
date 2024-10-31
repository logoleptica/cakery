document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const cupcakes = [
    { title: "Vanilla Cupcake", price: "$3.00", img: "images/cupcake1.jpg" },
    { title: "Chocolate Cupcake", price: "$3.50", img: "images/cupcake2.jpg" },
    // Add 6 more cupcake objects
];

const weddingCakes = [
    { title: "Classic Wedding Cake", price: "$150.00", img: "images/wedding-cake1.jpg" },
    { title: "Floral Wedding Cake", price: "$175.00", img: "images/wedding-cake2.jpg" },
    // Add 6 more wedding cake objects
];
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>${product.price}</p>
        `;
        container.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(cupcakes, 'cupcake-container');
    displayProducts(weddingCakes, 'wedding-cake-container');
});
