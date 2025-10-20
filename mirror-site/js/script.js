// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && hamburger) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.mirror-card, .feature-item, .notice-box').forEach(el => {
    observer.observe(el);
});

// Copy mirror link to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show a temporary tooltip or notification
        showNotification('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-red);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check if mirrors are online (optional - can be implemented with backend)
async function checkMirrorStatus(url) {
    try {
        const response = await fetch(url, { mode: 'no-cors' });
        return true;
    } catch (error) {
        return false;
    }
}

// Update mirror status badges (optional)
const updateMirrorStatuses = async () => {
    const mirrorCards = document.querySelectorAll('.mirror-card:not(.mirror-card-placeholder)');
    
    mirrorCards.forEach(async (card) => {
        const link = card.querySelector('.mirror-button');
        if (link) {
            const url = link.getAttribute('href');
            const statusBadge = card.querySelector('.status-badge');
            
            // You can implement actual status checking here
            // For now, we'll just keep them as active
        }
    });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Update mirror statuses
    // updateMirrorStatuses();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.mirror-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('mirror-card-placeholder')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
});

// Prevent context menu on video (optional security)
const video = document.querySelector('.background-video');
if (video) {
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

// Add parallax effect to background video
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const video = document.querySelector('.background-video');
    if (video) {
        video.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
