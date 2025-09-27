// Products data
const products = [
  { name: "Laptop", price: 31200, desc: "High-performance laptop", img: "laptop.jpg" },
  { name: "Phone", price: 23800, desc: "Latest smartphone", img: "phone.jpg" },
  { name: "Watch", price: 45200, desc: "Smart watch", img: "watch.jpg" },
  { name: "Airpods", price: 5200, desc: "High-performance airpods", img: "airpods.jpg" },
  { name: "Bose", price: 1800, desc: "Latest bose items", img: "bose.jpg" },
  { name: "Camera", price: 7200, desc: "New version camera", img: "camera.jpg" },
  { name: "Laptop", price: 8200, desc: "Exclusive laptop", img: "laptop.jpg" },
  { name: "Pol", price: 9800, desc: "polaroid camera on Sale", img: "pol.jpg" },
  { name: "Printer", price: 14200, desc: "Epson printer ", img: "printer.jpg" },
  { name: "Sound", price: 58200, desc: "Bose New Version Soundspeakers", img: "sound.jpg" },
  { name: "Speaker", price: 11800, desc: "Bose Speaker", img: "speaker.jpg" }
];

// Background images
const homeBackgrounds = ["home1.jpg", "home2.jpg"];
const productBackgrounds = ["product1.jpg", "product2.jpg"];

// Set random background
function setRandomBackground() {
  const body = document.body;
  if (body.classList.contains("home")) {
    const img = homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  } else if (body.classList.contains("product")) {
    const img = productBackgrounds[Math.floor(Math.random() * productBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  } else if (body.classList.contains("cart")) {
    const img = homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  } else if (body.classList.contains("payment")) {
    const img = productBackgrounds[Math.floor(Math.random() * productBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  }
}

// Display products in grid (filtered)
function displayProducts(filtered = products) {
  const container = document.querySelector(".products");
  if (!container) return;
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<h2>No products found.</h2>";
    return;
  }

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `;
    div.onclick = () => showProduct(product.name, product.price, product.desc, product.img);
    container.appendChild(div);
  });
}

// Show product details: save to localStorage and go to product page
function showProduct(name, price, desc, img) {
  localStorage.setItem('productName', name);
  localStorage.setItem('productPrice', price);
  localStorage.setItem('productDesc', desc);
  localStorage.setItem('productImg', img);
  window.location.href = 'product.html';
}

// Load product details on product.html
function loadProductDetails() {
  const nameEl = document.getElementById('productName');
  if (!nameEl) return;

  nameEl.innerText = localStorage.getItem('productName') || "Product Name";
  document.getElementById('productPrice').innerText = 'Price: $' + (localStorage.getItem('productPrice') || "0");
  document.getElementById('productDesc').innerText = 'Description: ' + (localStorage.getItem('productDesc') || "No description.");
  
  // Add image dynamically
  let imgEl = document.querySelector(".detail-img");
  if (!imgEl) {
    imgEl = document.createElement("img");
    imgEl.className = "detail-img";
    nameEl.insertAdjacentElement('afterend', imgEl);
  }
  imgEl.src = localStorage.getItem('productImg') || "placeholder.jpg";

  // Setup Add to Cart button
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    addBtn.onclick = () => addToCart({
      name: localStorage.getItem('productName'),
      price: Number(localStorage.getItem('productPrice')),
      img: localStorage.getItem('productImg')
    });
  }
}

// Add product to cart (localStorage)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Added "${product.name}" to cart.`);
}

// Display cart items on cart.html
function loadCart() {
  const container = document.querySelector('.cart-container');
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<h2>Your cart is empty.</h2>';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total';
  totalDiv.innerText = `Total: $${total.toFixed(2)}`;
  container.appendChild(totalDiv);

  const checkoutBtn = document.createElement('button');
  checkoutBtn.className = 'checkout-btn';
  checkoutBtn.innerText = 'Proceed to Payment';
  checkoutBtn.onclick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    window.location.href = 'payment.html';
  };
  container.appendChild(checkoutBtn);
}

// Remove item from cart by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Search products in real-time
function setupSearch() {
  const searchInput = document.getElementById('searchBar');
  if (!searchInput) return;

  searchInput.oninput = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      displayProducts(filtered);
    }
  };
}

// Go back helper
function goBack() {
  window.location.href = 'index.html';
}

// Slider variables and functions
let currentIndex = 0;
const slidesToShow = 4;

function initSlider() {
  const slider = document.querySelector('.slider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!slider || !prevBtn || !nextBtn) return;

  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  };

  nextBtn.onclick = () => {
    if (currentIndex < products.length - slidesToShow) {
      currentIndex++;
      updateSlider();
    }
  };

  updateSlider();
}

function updateSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const slideWidth = slider.querySelector('.slide')?.offsetWidth || 200;
  slider.style.transform = `translateX(${-currentIndex * (slideWidth + 15)}px)`;
}

// Initialize everything on window load
window.onload = function() {
  setRandomBackground();

  if (document.body.classList.contains("home")) {
    displayProducts(products);
    setupSearch();
    initSlider();
  } else if (document.body.classList.contains("product")) {
    loadProductDetails();
  } else if (document.body.classList.contains("cart")) {
    loadCart();
  }
};







