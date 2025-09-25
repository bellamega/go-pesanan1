// Data menu (bisa diambil dari API di proyek nyata)
const menu = [
    { id: 1, name: "Nasi Goreng Spesial", price: 25000, category: "food", image: "https://via.placeholder.com/400x300.png?text=Nasi+Goreng" },
    { id: 2, name: "Mie Ayam Bakso", price: 20000, category: "food", image: "https://via.placeholder.com/400x300.png?text=Mie+Ayam" },
    { id: 3, name: "Sate Ayam Madura", price: 30000, category: "food", image: "https://via.placeholder.com/400x300.png?text=Sate+Ayam" },
    { id: 4, name: "Es Teh Manis", price: 5000, category: "drink", image: "https://via.placeholder.com/400x300.png?text=Es+Teh" },
    { id: 5, name: "Es Jeruk", price: 8000, category: "drink", image: "https://via.placeholder.com/400x300.png?text=Es+Jeruk" },
];

let cart = [];

// Fungsi untuk membuat item menu di HTML
const createMenuItem = (item) => {
    return `
        <div class="bg-white rounded-lg shadow-lg p-4">
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded-md mb-4">
            <h3 class="text-xl font-bold mb-2">${item.name}</h3>
            <p class="text-gray-600 mb-4">Rp ${item.price.toLocaleString('id-ID')}</p>
            <button class="add-to-cart-btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors" data-id="${item.id}">
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

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.dataset.id;
            addToCart(id);
        }
    });

    // Event listener untuk tombol "Bayar Sekarang" di keranjang
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            // Sembunyikan modal keranjang
            document.getElementById('keranjang').style.display = 'none';
            // Tampilkan modal pembayaran
            openPaymentModal();
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

    floatingCartBtn.addEventListener('click', () => {
        keranjangModal.style.display = 'flex';
    });

    closeCartBtn.addEventListener('click', () => {
        keranjangModal.style.display = 'none';
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Pesanan Anda berhasil! Kami akan segera memprosesnya.');
            cart = [];
            updateCartUI();
            keranjangModal.style.display = 'none';
        } else {
            alert('Keranjang Anda kosong!');
        }
    });
});



