// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    setupEventListeners();
    animateOnScroll();
}

function setupEventListeners() {
    // Manage Booking buttons
    const manageButtons = document.querySelectorAll('.manage-btn');
    manageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Manage Booking - Redirecting to booking management...');
        });
    });

    // Details links
    const detailsLinks = document.querySelectorAll('.details-link');
    detailsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Viewing expedition details...');
        });
    });

    // Edit Personal Details button
    const editBtn = document.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening personal details editor...');
        });
    }

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Newsletter form
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const emailInput = document.querySelector('.newsletter-input');
            if (emailInput.value) {
                alert('Thank you for subscribing! Check your email.');
                emailInput.value = '';
            } else {
                alert('Please enter your email address.');
            }
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                alert('Logging out...');
            }
        });
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe expedition cards
    const cards = document.querySelectorAll('.expedition-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 100}ms`;
        observer.observe(card);
    });

    // Observe info groups
    const infoGroups = document.querySelectorAll('.info-group');
    infoGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.6s ease ${index * 50}ms`;
        observer.observe(group);
    });
}
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease forwards';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close notifications
    if (e.key === 'Escape') {
        console.log('Escape pressed');
    }
});
