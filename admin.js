<<<<<<< HEAD
// Ambil pesanan dari localStorage (simulasi, sesuaikan dengan implementasi penyimpanan pesananmu)
function loadOrders() {
    const orderList = document.getElementById('order-list');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length === 0) {
        orderList.innerHTML = '<div class="text-gray-500">Belum ada pesanan.</div>';
        return;
    }
    orderList.innerHTML = orders.map(order => `
        <div class="border rounded p-3 bg-gray-50">
            <div><b>Nama:</b> ${order.nama}</div>
            <div><b>Kode Meja:</b> ${order.kodeMeja}</div>
            <div><b>Pesanan:</b> ${order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</div>
            <div><b>Catatan:</b> ${order.note || '-'}</div>
            <div><b>Total:</b> Rp ${order.total.toLocaleString('id-ID')}</div>
        </div>
    `).join('');
}

// Tambah menu baru ke localStorage
function addMenu(e) {
    e.preventDefault();
    const name = document.getElementById('menu-name').value;
    const price = parseInt(document.getElementById('menu-price').value, 10);
    const category = document.getElementById('menu-category').value;
    const image = document.getElementById('menu-image').value || 'https://via.placeholder.com/400x300?text=Menu';

    // Ambil menu lama
    const menus = JSON.parse(localStorage.getItem('menus') || '[]');
    menus.push({
        id: Date.now(),
        name,
        price,
        category,
        image
    });
    localStorage.setItem('menus', JSON.stringify(menus));
    document.getElementById('add-menu-success').classList.remove('hidden');
    document.getElementById('add-menu-form').reset();
}

document.getElementById('add-menu-form').addEventListener('submit', addMenu);
=======
// Ambil pesanan dari localStorage (simulasi, sesuaikan dengan implementasi penyimpanan pesananmu)
function loadOrders() {
    const orderList = document.getElementById('order-list');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length === 0) {
        orderList.innerHTML = '<div class="text-gray-500">Belum ada pesanan.</div>';
        return;
    }
    orderList.innerHTML = orders.map(order => `
        <div class="border rounded p-3 bg-gray-50">
            <div><b>Nama:</b> ${order.nama}</div>
            <div><b>Kode Meja:</b> ${order.kodeMeja}</div>
            <div><b>Pesanan:</b> ${order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</div>
            <div><b>Catatan:</b> ${order.note || '-'}</div>
            <div><b>Total:</b> Rp ${order.total.toLocaleString('id-ID')}</div>
        </div>
    `).join('');
}

// Tambah menu baru ke localStorage
function addMenu(e) {
    e.preventDefault();
    const name = document.getElementById('menu-name').value;
    const price = parseInt(document.getElementById('menu-price').value, 10);
    const category = document.getElementById('menu-category').value;
    const image = document.getElementById('menu-image').value || 'https://via.placeholder.com/400x300?text=Menu';

    // Ambil menu lama
    const menus = JSON.parse(localStorage.getItem('menus') || '[]');
    menus.push({
        id: Date.now(),
        name,
        price,
        category,
        image
    });
    localStorage.setItem('menus', JSON.stringify(menus));
    document.getElementById('add-menu-success').classList.remove('hidden');
    document.getElementById('add-menu-form').reset();
}

document.getElementById('add-menu-form').addEventListener('submit', addMenu);
>>>>>>> c47fd926ebe6d1ade58c352b9bce3137fbc16cc0
window.addEventListener('DOMContentLoaded', loadOrders);