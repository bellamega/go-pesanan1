// Data menu (bisa diambil dari API di proyek nyata)
const menu = [
  { 
    id: 1, 
    name: "Nasi Goreng", 
    price: 20000, 
    image: "images/nasgor.jpg"
  },
  { 
    id: 2, 
    name: "Mie Goreng", 
    price: 18000, 
    image: "images/miegoreng.jpg"
  },
  { 
    id: 3, 
    name: "Ayam Bakar", 
    price: 25000, 
    image: "images/ayambakar.jpg"
  },
  { 
    id: 4, 
    name: "Es Teh Manis", 
    price: 5000, 
    image: "images/esteh.jpg"
  }
];

let cart = [];

// Render menu ke halaman
const menuContainer = document.getElementById('menu');
menu.forEach(item => {
  const menuItem = createMenuItem(item);
  menuContainer.appendChild(menuItem);
});

function createMenuItem(item) {
  const div = document.createElement('div');
  div.classList.add('menu-item');

  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Rp ${item.price.toLocaleString()}</p>
    <button onclick="addToCart(${item.id})">Tambah</button>
  `;

  return div;
}

function addToCart(id) {
  const item = menu.find(m => m.id === id);
  const itemInCart = cart.find(c => c.id === id);

  if (itemInCart) {
    itemInCart.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  cartList.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}`;
    cartList.appendChild(li);
  });

  totalPriceEl.textContent = `Rp ${total.toLocaleString()}`;
}

// Modal Keranjang
const keranjangBtn = document.getElementById('keranjang-btn');
const keranjangModal = document.getElementById('keranjang-modal');
const closeCartBtn = document.getElementById('close-cart');

keranjangBtn.addEventListener('click', () => {
  keranjangModal.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
  keranjangModal.style.display = 'none';
});
