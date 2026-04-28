// --- State Management ---
let currentLoginRole = 'buyer';

let sellerProfile = { name: '', location: '', harvest: '', experience: '' };
let buyerProfile = { name: '', address: '', mobile: '' };

// Simulated database
let inventory = [
    { id: 1, name: "Premium Wheat", location: "Punjab, India", qty: 500, price: 35.00 },
    { id: 2, name: "Organic Apples", location: "Himachal Pradesh", qty: 200, price: 120.00 }
];

let orders = [];
const PLATFORM_DISCOUNT = 0.10; // 10% discount

// --- Navigation & UI Logic ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function setLoginRole(role) {
    currentLoginRole = role;
    document.getElementById('tab-buyer').classList.remove('active');
    document.getElementById('tab-seller').classList.remove('active');
    document.getElementById(`tab-${role}`).classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    document.body.classList.add('logged-in'); 
    
    if (currentLoginRole === 'seller') {
        switchScreen('screen-seller');
        renderSellerInventory();
        renderSellerOrders();
        document.getElementById('profile-farm-name').value = sellerProfile.name;
        document.getElementById('profile-farm-location').value = sellerProfile.location;
        document.getElementById('profile-farm-harvest').value = sellerProfile.harvest;
        document.getElementById('profile-farm-experience').value = sellerProfile.experience;
        document.getElementById('display-seller-name').innerText = sellerProfile.name ? `👤 ${sellerProfile.name}` : `👤 Set Profile`;
    } else {
        switchScreen('screen-buyer');
        renderBuyerMarket();
        renderBuyerOrders();
        document.getElementById('profile-buyer-name').value = buyerProfile.name;
        document.getElementById('profile-buyer-address').value = buyerProfile.address;
        document.getElementById('profile-buyer-mobile').value = buyerProfile.mobile || '';
        document.getElementById('display-buyer-name').innerText = buyerProfile.name ? `👤 ${buyerProfile.name}` : `👤 Set Profile`;
        updateBuyerProfileStats();
    }
}

function logout() {
    document.body.classList.remove('logged-in'); 
    document.getElementById('login-form').reset();
    document.getElementById('purchase-card').style.display = 'none';
    document.getElementById('purchase-message').innerHTML = '';
    document.getElementById('route-visualization').style.display = 'none';
    switchScreen('screen-login');
}

// --- Modal Logic ---
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// --- Profile Logic ---
function handleSellerProfileSave(e) {
    e.preventDefault();
    sellerProfile.name = document.getElementById('profile-farm-name').value;
    sellerProfile.location = document.getElementById('profile-farm-location').value;
    sellerProfile.harvest = document.getElementById('profile-farm-harvest').value;
    sellerProfile.experience = document.getElementById('profile-farm-experience').value;
    syncSellerLocation();
    document.getElementById('display-seller-name').innerText = `👤 ${sellerProfile.name || 'Set Profile'}`;
    closeModal('seller-profile-modal');
}

function syncSellerLocation() {
    const loc = document.getElementById('profile-farm-location').value;
    const itemLoc = document.getElementById('item-location');
    if (!itemLoc.value || itemLoc.value === sellerProfile.location) {
        itemLoc.value = loc;
    }
}

function handleBuyerProfileSave(e) {
    e.preventDefault();
    buyerProfile.name = document.getElementById('profile-buyer-name').value;
    buyerProfile.address = document.getElementById('profile-buyer-address').value;
    buyerProfile.mobile = document.getElementById('profile-buyer-mobile').value;
    document.getElementById('display-buyer-name').innerText = `👤 ${buyerProfile.name || 'Set Profile'}`;
    closeModal('buyer-profile-modal');
}

function updateBuyerProfileStats() {
    let totalOrders = 0;
    let totalVolume = 0;
    
    orders.forEach(o => {
        // Count only successful orders
        if(o.status !== 'Cancelled') {
            totalOrders++;
            totalVolume += o.qty;
        }
    });
    
    document.getElementById('stat-total-orders').innerText = totalOrders;
    document.getElementById('stat-total-volume').innerText = `${totalVolume} kg`;
}

// --- Seller Logic ---
function calculateTotal() {
    const qty = parseFloat(document.getElementById('item-qty').value) || 0;
    const price = parseFloat(document.getElementById('item-price').value) || 0;
    const total = qty * price;
    document.getElementById('item-total').innerText = `₹${total.toFixed(2)}`;
}

function handleAddItem(e) {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const location = document.getElementById('item-location').value;
    const qty = parseFloat(document.getElementById('item-qty').value);
    const price = parseFloat(document.getElementById('item-price').value);

    const newItem = {
        id: Date.now(),
        name: name,
        location: location,
        qty: qty,
        price: price
    };

    inventory.push(newItem);
    
    document.getElementById('add-item-form').reset();
    syncSellerLocation(); // Put location back after reset
    calculateTotal();
    renderSellerInventory();
}

function renderSellerInventory() {
    const tbody = document.getElementById('seller-inventory-body');
    if(!tbody) return;
    tbody.innerHTML = '';

    if (inventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No items listed yet.</td></tr>';
        return;
    }

    inventory.forEach(item => {
        const total = item.qty * item.price;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty} kg</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td><strong>₹${total.toFixed(2)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderSellerOrders() {
    const tbody = document.getElementById('seller-orders-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No sales orders yet.</td></tr>';
        return;
    }

    orders.forEach(order => {
        const tr = document.createElement('tr');
        // If order is cancelled, show it visually
        const statusColor = order.status === 'Cancelled' ? 'color:var(--error); text-decoration:line-through;' : '';
        const amtColor = order.status === 'Cancelled' ? 'color:var(--text-muted); text-decoration:line-through;' : 'color:var(--success);';
        
        tr.innerHTML = `
            <td style="${statusColor}">#${order.id.toString().slice(-4)}</td>
            <td style="${statusColor}">${order.name}</td>
            <td style="${statusColor}">${order.qty} kg</td>
            <td><strong style="${amtColor}">+₹${order.total.toFixed(2)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Buyer Logic ---
function renderBuyerMarket() {
    const tbody = document.getElementById('buyer-market-body');
    if(!tbody) return;
    tbody.innerHTML = '';

    const searchInput = document.getElementById('buyer-search');
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    const filteredInventory = inventory.filter(item => {
        return item.name.toLowerCase().includes(query) || 
               item.location.toLowerCase().includes(query);
    });

    if (filteredInventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No items found matching your search.</td></tr>';
        return;
    }

    filteredInventory.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.location}</td>
            <td>${item.qty} kg</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-outline btn-small" onclick="selectItemToBuy(${item.id})">Select</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function selectItemToBuy(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    document.getElementById('purchase-card').style.display = 'block';
    document.getElementById('purchase-item-id').value = item.id;
    document.getElementById('purchase-message').innerHTML = '';
    document.getElementById('route-visualization').style.display = 'none';
    document.getElementById('discount-preview').style.display = 'none';
    document.getElementById('purchase-qty').value = '';
    
    document.getElementById('selected-item-details').style.display = 'flex';
    document.getElementById('selected-item-details').style.gap = '1rem';
    document.getElementById('selected-item-details').style.alignItems = 'center';
    
    document.getElementById('selected-item-details').innerHTML = `
        <img src="assets/crop_item.png" class="animated-item" alt="Crop">
        <div>
            <strong style="font-size:1.1rem; color:var(--primary);">${item.name}</strong><br>
            <span style="color:var(--text-muted); font-size:0.9rem;">📍 ${item.location}</span><br>
            Price: ₹${item.price.toFixed(2)}/kg<br>
            Available: ${item.qty} kg
        </div>
    `;
    
    document.getElementById('purchase-qty').focus();
}

function calculateBuyerDiscount() {
    const id = parseInt(document.getElementById('purchase-item-id').value);
    const reqQty = parseFloat(document.getElementById('purchase-qty').value);
    const item = inventory.find(i => i.id === id);
    const previewDiv = document.getElementById('discount-preview');
    
    if (!item || isNaN(reqQty) || reqQty <= 0) {
        previewDiv.style.display = 'none';
        return;
    }
    
    const subtotal = reqQty * item.price;
    const discountAmt = subtotal * PLATFORM_DISCOUNT;
    const finalTotal = subtotal - discountAmt;
    
    previewDiv.style.display = 'flex';
    previewDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between;"><span>Subtotal:</span> <span>₹${subtotal.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; color:var(--success);"><span>Discount (10%):</span> <span>-₹${discountAmt.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; border-top:1px solid #c8e6c9; margin-top:0.5rem; padding-top:0.5rem;">
            <strong>Final Total:</strong> <strong>₹${finalTotal.toFixed(2)}</strong>
        </div>
    `;
}

function handlePurchase(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('purchase-item-id').value);
    const reqQty = parseFloat(document.getElementById('purchase-qty').value);
    const item = inventory.find(i => i.id === id);
    const msgDiv = document.getElementById('purchase-message');

    if (!item) return;

    if (reqQty <= 0) {
        msgDiv.innerHTML = '<span class="error-msg">Please enter a valid quantity.</span>';
        return;
    }

    if (reqQty > item.qty) {
        msgDiv.innerHTML = `<span class="error-msg">Only ${item.qty} kg available. Please reduce quantity.</span>`;
    } else {
        const subtotal = reqQty * item.price;
        const discountAmt = subtotal * PLATFORM_DISCOUNT;
        const finalCost = subtotal - discountAmt;
        const days = Math.floor(Math.random() * 5) + 1;
        
        // Process order
        item.qty -= reqQty;
        orders.push({
            id: Date.now(),
            itemId: item.id, // Store to allow refunds
            name: item.name,
            qty: reqQty,
            total: finalCost,
            status: "In Transit",
            days: days
        });
        
        msgDiv.innerHTML = `<span class="success-msg">Order Confirmed! ${reqQty}kg of ${item.name} for ₹${finalCost.toFixed(2)}.</span>`;
        
        // Show route visualization
        document.getElementById('route-visualization').style.display = 'block';
        document.getElementById('route-eta').innerText = `Estimated Delivery: ${days} Day(s)`;
        document.getElementById('route-origin').innerText = item.location || 'Farm';
        document.getElementById('route-dest').innerText = buyerProfile.address || 'Buyer Destination';
        
        renderBuyerMarket();
        renderBuyerOrders();
        updateBuyerProfileStats();
        document.getElementById('purchase-form').reset();
        document.getElementById('discount-preview').style.display = 'none';
        
        if (item.qty <= 0) {
            setTimeout(() => {
                document.getElementById('purchase-card').style.display = 'none';
            }, 2000);
        } else {
             document.getElementById('selected-item-details').innerHTML = `
                <img src="assets/crop_item.png" class="animated-item" alt="Crop">
                <div>
                    <strong style="font-size:1.1rem; color:var(--primary);">${item.name}</strong><br>
                    <span style="color:var(--text-muted); font-size:0.9rem;">📍 ${item.location}</span><br>
                    Price: ₹${item.price.toFixed(2)}/kg<br>
                    Available: ${item.qty} kg
                </div>
            `;
        }
    }
}

function renderBuyerOrders() {
    const tbody = document.getElementById('buyer-orders-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No past orders.</td></tr>';
        return;
    }

    // Sort by id descending so newest is on top
    const sortedOrders = [...orders].sort((a,b) => b.id - a.id);

    sortedOrders.forEach(order => {
        const tr = document.createElement('tr');
        
        let statusHtml = order.status;
        let actionHtml = '';
        
        if (order.status === 'Cancelled') {
            statusHtml = `<span style="color:var(--error); font-weight:600;">${order.status}</span>`;
            actionHtml = `<span style="color:var(--text-muted); font-size:0.85rem;">None</span>`;
        } else {
            statusHtml = `<span class="success-msg">${order.status}</span>`;
            actionHtml = `<button class="btn btn-outline btn-small" onclick="cancelOrder(${order.id})" style="color:var(--error); border-color:var(--error);">Cancel</button>`;
        }

        tr.innerHTML = `
            <td>#${order.id.toString().slice(-4)}</td>
            <td style="${order.status==='Cancelled' ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${order.name}</td>
            <td>${order.qty} kg</td>
            <td>₹${order.total.toFixed(2)}</td>
            <td>${order.days} Day(s)</td>
            <td>${statusHtml}</td>
            <td>${actionHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

function cancelOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status === 'Cancelled') return;
    
    // Refund inventory
    const item = inventory.find(i => i.id === order.itemId);
    if (item) {
        item.qty += order.qty;
    } else {
        // If the item was completely removed, we could recreate it, 
        // but currently we just decrement qty so it's always in the array.
    }
    
    // Update order status
    order.status = 'Cancelled';
    
    renderBuyerOrders();
    updateBuyerProfileStats();
    renderBuyerMarket();
    renderSellerInventory(); // Keep data consistent
    renderSellerOrders();
}
