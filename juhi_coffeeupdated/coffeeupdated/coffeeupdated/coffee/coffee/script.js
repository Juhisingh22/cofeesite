let navbar = document.querySelector('.navbar');
let cartItem = document.querySelector('.cart-item-container');
let cartList = document.querySelector('#cart-items');
let searchForm = document.querySelector('.search-form');

// Toggle navbar, search, and cart visibility
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
// Get all "Add to Cart" buttons

// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.btn');

// Get the cart item container
const cartItemContainer = document.getElementById('cart-item-container');

// Create an object to track the items in the cart
const cartItems = {};

// Loop through each button and add event listener
addToCartButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default button behavior

    // Get item data from button attributes
    const itemName = button.getAttribute('data-name');
    const itemPrice = button.getAttribute('data-price');
    const itemImage = button.getAttribute('data-image');

    // Check if the item already exists in the cart
    if (cartItems[itemName]) {
      // If item exists, update the quantity
      cartItems[itemName].quantity++;
      updateCartItem(cartItems[itemName]);
    } else {
      // If item doesn't exist, create a new entry
      const cartItem = createNewCartItem(itemName, itemPrice, itemImage);
      cartItems[itemName] = { 
        element: cartItem, 
        quantity: 1 
      };
      cartItemContainer.appendChild(cartItem);
    }
  });
});

// Function to create a new cart item
function createNewCartItem(itemName, itemPrice, itemImage) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.setAttribute('data-name', itemName);

  cartItem.innerHTML = `
    <span class="fas fa-times"></span>
    <img src="${itemImage}" alt="${itemName}">
    <div class="content">
      <h3>${itemName}</h3>
      <div class="price">$${itemPrice}</div>
    </div>
    <div class="quantity-badge">1</div> <!-- Initial quantity -->
  `;

  // Add event listener to remove item
  const removeButton = cartItem.querySelector('.fas.fa-times');
  removeButton.addEventListener('click', function() {
    cartItem.remove();
    delete cartItems[itemName]; // Remove from cartItems object
  });

  return cartItem;
}

// Function to update the cart item quantity
function updateCartItem(cartItemData) {
  const cartItem = cartItemData.element;
  const quantityBadge = cartItem.querySelector('.quantity-badge');
  quantityBadge.textContent = cartItemData.quantity;
}











// Add items to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = () => {
        const item = button.dataset.item; // Get item name (e.g., coffee)
        addItemToCart(item);
    };
});

// Add item to cart and store in localStorage
function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage or create a new one

    // Check if the item already exists in the cart
    if (!cart.includes(item)) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        alert(`${item} added to cart!`);
        updateCartDisplay(); // Update the cart display
    } else {
        alert(`${item} is already in the cart.`);
    }
}

// Update cart display
function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = ''; // Clear the current cart display

    // Display each item in the cart
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
    });
}

// Initialize cart display on page load
updateCartDisplay();
