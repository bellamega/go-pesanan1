// Data menu (bisa diambil dari API di proyek nyata)
const menu = [
  { 
    id: 1, 
    name: "Nasi Goreng Spesial", 
    price: 25000, 
    category: "food", 
    image: "images/nasgor.jpg"
  },
  { 
    id: 2, 
    name: "Mie Ayam Bakso", 
    price: 20000, 
    category: "food", 
    image: "images/mie-ayam.jpeg"
  }, 
  { 
    id: 3, 
    name: "Soto Ayam", 
    price: 30000, 
    category: "food", 
    image: "images/soto-ayam.jpg"
  },
    { 
    id: 4, 
    name: "Sate Ayam", 
    price: 30000, 
    category: "food", 
    image: "images/sate-ayam.jpeg"
  },
      { 
    id: 5, 
    name: "Mie Bakso", 
    price: 30000, 
    category: "food", 
    image: "images/mie-bakso.png"
  },
        { 
    id: 6, 
    name: "Nasi Rendang", 
    price: 30000, 
    category: "food", 
    image: "images/nasi-rendang.jpg"
  },
          { 
    id: 7, 
    name: "Sate Sapi", 
    price: 30000, 
    category: "food", 
    image: "images/sate-sapi.jpg"
  },
            { 
    id: 8, 
    name: "Mie Goreng Spesial", 
    price: 30000, 
    category: "food", 
    image: "images/mie-goreng.jpeg"
  },
  { 
    id: 9, 
    name: "Es Jeruk", 
    price: 5000, 
    category: "drink", 
    image: "images/es-jeruk.jpg"
  },
  { 
    id: 10, 
    name: "Es Teh", 
    price: 8000, 
    category: "drink", 
    image: "images/es-teh.jpg" 
  },
    { 
    id: 11, 
    name: "Es Teler", 
    price: 8000, 
    category: "drink", 
    image: "images/es-teler.jpg" 
  },
      { 
    id: 12, 
    name: "Es Cendol", 
    price: 8000, 
    category: "drink", 
    image: "images/es-cendol.jpg" 
  },
    { 
    id: 13, 
    name: "Es Sultan", 
    price: 8000, 
    category: "drink", 
    image: "images/es-sultan.jpg" 
  },

    { 
    id: 14, 
    name: "Air Mineral", 
    price: 8000, 
    category: "drink", 
    image: "images/air-mineral.png" 
  }
];


let cart = [];

// Fungsi untuk membuat item menu di HTML
const createMenuItem = (item) => {
    return `
        <div class="bg-white rounded-2xl shadow-xl p-4 flex flex-col h-full border-2 border-transparent hover:border-blue-400 transition-all duration-200">
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded-xl mb-4 shadow-sm">
            <h3 class="text-xl font-bold mb-1 text-blue-700">${item.name}</h3>
            <p class="text-gray-600 mb-4">Rp ${item.price.toLocaleString('id-ID')}</p>
            <button 
                class="add-to-cart-btn bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-green-700 transition-colors mt-auto font-semibold shadow"
                data-id="${item.id}">
                Tambah ke Keranjang
            </button>
        </div>
    `;
};


// Fungsi untuk mengupdate tampilan keranjang
const updateCartUI = () => {
    const cartItemsEl = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total');
    const floatingCartBtn = document.getElementById('floating-cart-btn');
    let total = 0;

    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = "flex justify-between items-center p-2 border-b last:border-b-0";
        itemEl.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md object-cover">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button class="decrease-quantity-btn bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity-btn bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold" data-id="${item.id}">+</button>
            </div>
        `;
        cartItemsEl.appendChild(itemEl);
        total += item.price * item.quantity;
    });

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartTotalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;

    if (totalItems > 0) {
        floatingCartBtn.classList.remove('hidden');
        floatingCartBtn.classList.add('flex');
    } else {
        floatingCartBtn.classList.add('hidden');
        floatingCartBtn.classList.remove('flex');
    }
};

// Fungsi untuk membuka modal pembayaran
const openPaymentModal = () => {
    const paymentModal = document.getElementById('payment-modal');
    const paymentSummaryEl = document.getElementById('payment-summary');
    const finalTotalEl = document.getElementById('final-total');

    // Tampilkan ringkasan pesanan
    paymentSummaryEl.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = "flex justify-between";
        itemEl.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
        `;
        paymentSummaryEl.appendChild(itemEl);
    });

    // Tampilkan total akhir
    const finalTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    finalTotalEl.textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;

    // Tampilkan modal
    paymentModal.style.display = 'flex';
};

const increaseQuantity = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
        item.quantity++;
        updateCartUI();
    }
};

const decreaseQuantity = (id) => {
    const itemIndex = cart.findIndex(item => item.id === parseInt(id));
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartUI();
    }
};

const addToCart = (id) => {
    const itemToAdd = menu.find(item => item.id === parseInt(id));
    const existingItem = cart.find(item => item.id === parseInt(id));

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...itemToAdd, quantity: 1 });
    }
    updateCartUI();
};

document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menampilkan menu
    const displayMenu = () => {
        const foodMenuList = document.getElementById('food-menu-list');
        const drinkMenuList = document.getElementById('drink-menu-list');
    
        foodMenuList.innerHTML = menu.filter(item => item.category === 'food').map(createMenuItem).join('');
        drinkMenuList.innerHTML = menu.filter(item => item.category === 'drink').map(createMenuItem).join('');
    };

    // Panggil fungsi displayMenu() di sini
    displayMenu();
    
    // Semua event listeners lainnya...
    const floatingCartBtn = document.getElementById('floating-cart-btn');
    const keranjangModal = document.getElementById('keranjang');
    const closeCartBtn = document.getElementById('close-cart-btn');
    
    floatingCartBtn.classList.add('hidden');



    // Event listener untuk tombol "Bayar Sekarang" di keranjang
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            const note = document.getElementById('cart-note').value;
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const nama = localStorage.getItem('nama');
            const kodeMeja = localStorage.getItem('kodeMeja');
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const waktu = new Date().toISOString(); // Tambahkan waktu ISO
            orders.push({
                nama,
                kodeMeja,
                items: cart.map(item => ({ name: item.name, quantity: item.quantity })),
                note,
                total,
                waktu // simpan waktu
            });
            localStorage.setItem('orders', JSON.stringify(orders));
            document.getElementById('keranjang').style.display = 'none';
            openPaymentModal();
            console.log('Catatan pelanggan:', note);
        } else {
            alert('Keranjang Anda kosong!');
        }
    });

    // Event listener untuk tombol "Bayar" di modal pembayaran
    document.getElementById('pay-now-btn').addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        alert(`Pesanan Anda berhasil! Anda akan diarahkan ke halaman pembayaran ${selectedMethod}.`);

        // Logika untuk membersihkan keranjang setelah pembayaran berhasil
        cart = [];
        updateCartUI();
        document.getElementById('payment-modal').style.display = 'none';
    });
    
    // Event listener untuk menutup modal pembayaran
    document.getElementById('close-payment-btn').addEventListener('click', () => {
        document.getElementById('payment-modal').style.display = 'none';
    });

    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-quantity-btn')) {
            const id = e.target.dataset.id;
            increaseQuantity(id);
        } else if (e.target.classList.contains('decrease-quantity-btn')) {
            const id = e.target.dataset.id;
            decreaseQuantity(id);
        }
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.dataset.id;
            addToCart(id);
            // Tidak perlu buka modal keranjang di sini!
        }
    });

    // Sudah ada event listener untuk floatingCartBtn:
    floatingCartBtn.addEventListener('click', () => {
        keranjangModal.style.display = 'flex';
    });

    closeCartBtn.addEventListener('click', () => {
        keranjangModal.style.display = 'none';
    });


});









