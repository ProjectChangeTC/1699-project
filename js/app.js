// Panjab Life — App JS (products, cart, filters)

const PRODUCTS = [
  {
    id: 1,
    name: "Chamkaur 1704 Oversized Tee",
    collection: "Chamkaur",
    gender: "men",
    type: "tee",
    price: 85,
    image: "images/kAILa.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "In December 1704 at Chamkaur Sahib, a small band of Khalsa warriors faced an overwhelming Mughal force. The stand became a symbol of unbreakable courage — 40 Sikhs who chose dignity over surrender. This piece carries that spirit of the saint-soldier.",
    heritageLink: "#chamkaur"
  },
  {
    id: 2,
    name: "Panj Aab Rivers Tee",
    collection: "Panj Aab",
    gender: "unisex",
    type: "tee",
    price: 75,
    image: "images/DDiC1.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    story: "Punjab takes its name from the five rivers that shape its land: Jhelum, Chenab, Ravi, Beas, and Sutlej. Ancient roots stretching back to the Indus Valley. This design flows like the waters that nourished a civilization.",
    heritageLink: "#panj-aab"
  },
  {
    id: 3,
    name: "Ik Onkar ੴ Khalsa Hoodie",
    collection: "Ik Onkar ੴ",
    gender: "unisex",
    type: "hoodie",
    price: 120,
    image: "images/nEOMb.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "ੴ Ik Onkar — One Universal Creator. The opening of the Mul Mantar and the foundation of Sikh belief. Worn as a reminder of oneness, equality, and the divine that connects all.",
    heritageLink: "#ik-onkar"
  },
  {
    id: 4,
    name: "Deg Teg Fateh Hoodie",
    collection: "Deg Teg Fateh",
    gender: "men",
    type: "hoodie",
    price: 125,
    image: "images/ymdze.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "Deg Teg Fateh — victory to the cauldron (langar and charity) and to the sword (defense of justice). The Khalsa anthem that balances compassion with strength.",
    heritageLink: "#deg-teg"
  },
  {
    id: 5,
    name: "Phulkari Mai Bhago Tee",
    collection: "Phulkari",
    gender: "women",
    type: "tee",
    price: 80,
    image: "images/MCnLc.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    story: "Phulkari is the living embroidery tradition of Punjab — floral motifs worked by hand. Mai Bhago, the warrior who rallied the 40 (Chali Mukte) at Muktsar, is honored here in line art. Strength and beauty woven together.",
    heritageLink: "#mai-bhago"
  },
  {
    id: 6,
    name: "1699 Khanda Oversized Tee",
    collection: "Khanda",
    gender: "men",
    type: "tee",
    price: 75,
    image: "images/hZaUL.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "The Khanda is the emblem of the Khalsa: the double-edged sword, the chakkar of eternity, and the two kirpans of Miri and Piri. 1699 marks the birth of the Khalsa at Anandpur Sahib on Vaisakhi.",
    heritageLink: "#khanda"
  },
  {
    id: 7,
    name: "Saragarhi 1897 Oversized Tee",
    collection: "Saragarhi 1897",
    gender: "men",
    type: "tee",
    price: 85,
    image: "images/gM3Xc.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "On 12 September 1897, 21 soldiers of the 36th Sikhs defended Saragarhi fort against thousands. Every man fought to the last. Their last stand is remembered as one of the greatest acts of collective courage in military history.",
    heritageLink: "#saragarhi"
  },
  {
    id: 8,
    name: "Miri Piri Hoodie",
    collection: "Miri Piri",
    gender: "unisex",
    type: "hoodie",
    price: 120,
    image: "images/p2Qq8.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    story: "Miri and Piri — temporal and spiritual power. The two swords of Guru Hargobind Ji symbolize that a Sikh walks in the world with both strength and inner sovereignty.",
    heritageLink: "#miri-piri"
  },
  {
    id: 9,
    name: "Chardi Kala Cropped Tee",
    collection: "Chardi Kala",
    gender: "women",
    type: "tee",
    price: 70,
    image: "images/TiN0v.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    story: "Chardi Kala — the eternal rising spirit. No matter the challenge, the Khalsa rises. A quiet reminder of resilience carried on the chest.",
    heritageLink: "#chardi-kala"
  }
];

let cart = JSON.parse(localStorage.getItem('1699_cart')) || [];

function saveCart() {
  localStorage.setItem('1699_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function addToCart(productId, size) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: 1
    });
  }
  saveCart();
  alert(`${product.name} (${size}) added to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty < 1) cart[index].qty = 1;
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:2rem;">Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
    document.getElementById('cart-total').textContent = '$0';
    return;
  }
  let html = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <div class="size-line">Size: ${item.size}</div>
          <div class="qty-controls">
            <button onclick="updateQty(${i}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${i}, 1)">+</button>
          </div>
        </div>
        <div class="price-col">
          $${item.price * item.qty}
          <button onclick="removeFromCart(${i})" class="remove-link">Remove</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  document.getElementById('cart-total').textContent = '$' + total;
}

function productCard(p) {
  const fit = p.gender === 'women' ? 'Women' : p.gender === 'men' ? 'Men' : 'Unisex';
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-info">
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-meta">${fit} &middot; ${p.collection}</div>
        <div class="product-price">$${p.price}</div>
      </div>
    </div>
  `;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  let filtered = PRODUCTS;
  if (filter !== 'all') {
    filtered = PRODUCTS.filter(p => 
      p.gender === filter || p.collection.toLowerCase().includes(filter.toLowerCase()) || p.type === filter
    );
  }
  grid.innerHTML = filtered.map(productCard).join('');
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = PRODUCTS.find(p => p.id === id);
  const container = document.getElementById('product-detail');
  if (!product || !container) {
    if (container) container.innerHTML = '<p>Product not found. <a href="shop.html">Back to shop</a></p>';
    return;
  }
  document.title = product.name + ' — Panjab Life';
  container.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div>
      <div class="eyebrow">${product.collection}</div>
      <h1>${product.name}</h1>
      <div class="price-lg">$${product.price}</div>
      <p style="color:var(--gray);font-size:14px;">${product.gender === 'women' ? 'Women\u2019s boyfriend / cropped fit' : 'Men\u2019s oversized heavyweight'} &middot; 240+ GSM cotton / heavyweight fleece</p>
      <div class="size-label">Select Size</div>
      <div class="size-options" id="size-options">
        ${product.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}
      </div>
      <button class="btn" id="add-btn" style="width:100%;margin-top:24px;">Add to Cart</button>
      <div class="story-block">
        <h3>The Story Behind the Design</h3>
        <p>${product.story}</p>
        <p style="margin-top:16px;"><a class="text-link" href="heritage.html${product.heritageLink}">Read the full story</a></p>
      </div>
      <p style="margin-top:24px;font-size:13px;color:var(--gray);">Extended sizing XS&ndash;3XL. Premium heavyweight fabrics. Every piece is a wearable history lesson.</p>
    </div>
  `;
  let selectedSize = null;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });
  document.getElementById('add-btn').addEventListener('click', () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product.id, selectedSize);
  });
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initMobileMenu();
  if (document.getElementById('product-grid')) {
    renderProducts();
    initFilters();
  }
  const homeGrid = document.getElementById('home-grid');
  if (homeGrid) {
    homeGrid.innerHTML = PRODUCTS.slice(0, 4).map(productCard).join('');
  }
  if (document.getElementById('product-detail')) {
    renderProductDetail();
  }
  if (document.getElementById('cart-items')) {
    renderCart();
  }
});

// Checkout simulation
function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  const form = document.getElementById('checkout-form');
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }
  alert('Order placed! Thank you for supporting Panjab Life. A confirmation will be sent (demo).');
  cart = [];
  saveCart();
  window.location.href = 'index.html';
}
