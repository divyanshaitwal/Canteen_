// ================= MOBILE MENU TOGGLE =================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================= NAVBAR SCROLL EFFECT =================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'white';
    }
    
    lastScroll = currentScroll;
});

// ================= SCROLL ANIMATIONS =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in effect
document.querySelectorAll('.stat-item, .hero-buttons, .hero-image, .floating-tag').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================= CART FUNCTIONALITY =================
let cart = JSON.parse(localStorage.getItem('canteenGoCart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('canteenGoCart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!');
}

function openCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartDetails = cart.map(item => 
        `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`
    ).join('\n');
    
    alert(`Your Cart:\n\n${cartDetails}\n\nTotal: Rs. ${total}`);
}

// ================= NOTIFICATION SYSTEM =================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ================= RESTAURANT SELECTOR =================
function openRestaurantSelector() {
    const restaurants = [
        'Main Campus Canteen',
        'Engineering Block Cafe',
        'Medical Block Mess',
        'Student Center Bistro'
    ];
    
    const choice = prompt(`Choose a restaurant:\n\n${restaurants.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nEnter number (1-4):`);
    
    if (choice && choice >= 1 && choice <= 4) {
        showNotification(`Selected: ${restaurants[choice - 1]}`);
        window.location.href = '10menu.html';
    }
}

// ================= DIETARY MODAL =================
function openDietaryModal(type) {
    showNotification(`Showing ${type} options...`);
    // You can expand this to show a proper modal
}

// ================= SEARCH FUNCTIONALITY =================
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = prompt('Search for food items:');
        if (searchTerm) {
            showNotification(`Searching for "${searchTerm}"...`);
            window.location.href = `10menu.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
}

// ================= BACK TO TOP BUTTON =================
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.1)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1)';
});

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// ================= FLOATING TAGS ANIMATION =================
document.querySelectorAll('.floating-tag').forEach((tag, index) => {
    const delay = index * 0.5;
    tag.style.animation = `float 3s ease-in-out ${delay}s infinite`;
});

// ================= INITIALIZE =================
updateCartCount();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

console.log('🍔 CanteenGo JS loaded successfully!');