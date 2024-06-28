// U22978120

const productContainer = document.querySelector('.product-container');
const loadingElement = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

let products = [];
let currentProductIndex = 0;

//Fetch Products
async function fetchProducts() {
  try {
    loadingElement.classList.add('active'); // Show loading state
    const response = await fetch('https://course-api.com/react-store-products');
    const data = await response.json();
    products.push(...data); // Add fetched data to products array
  } catch (error) {
    console.error('Error fetching products:', error);
    errorMessage.textContent = 'Error fetching products. Please try again later.';
    errorMessage.classList.add('active'); // error messaging Implemantation
  } finally {
    loadingElement.classList.remove('active'); // Hide loading state
  }

  displayProduct();
}

function displayProduct() {
  if (!products.length) return; // Handle empty product list

  const product = products[currentProductIndex];
  productContainer.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <h4>$${product.price}</h4>
    <p>${product.description}</p>
  `;
 updateNavigation();
}

function updateNavigation() {
  prevButton.disabled = currentProductIndex === 0;
  nextButton.disabled = currentProductIndex === products.length - 1;
}

prevButton.addEventListener('click', () => {
  currentProductIndex--;
  displayProduct();
});

nextButton.addEventListener('click', () => {
  currentProductIndex++;
  displayProduct();
});

fetchProducts();
