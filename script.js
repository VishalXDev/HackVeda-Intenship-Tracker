// Global Variables
let currentFilter = 'all';
let isScrolled = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupModals();
    setupFilters();
    setupForms();
    setupAnimations();
    setupSmoothScrolling();
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll Effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100 && !isScrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            isScrolled = true;
        } else if (scrollTop <= 100 && isScrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            isScrolled = false;
        }

        // Parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Stagger animations for grid items
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('course-card') || 
                    entry.target.classList.contains('internship-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .internship-card, .section-title');
    animatedElements.forEach(el => observer.observe(el));
}

// Modal Setup
function setupModals() {
    const studentModal = document.getElementById('studentModal');
    const callbackModal = document.getElementById('callbackModal');
    const studentRegisterBtn = document.getElementById('studentRegister');
    const getCallbackBtn = document.getElementById('getCallback');
    const getStartedBtn = document.getElementById('getStarted');
    const postJobBtn = document.getElementById('postJob');
    const closeBtns = document.querySelectorAll('.close');

    // Open modals
    if (studentRegisterBtn) {
        studentRegisterBtn.addEventListener('click', () => openModal(studentModal));
    }
    
    if (getCallbackBtn) {
        getCallbackBtn.addEventListener('click', () => openModal(callbackModal));
    }
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => openModal(studentModal));
    }
    
    if (postJobBtn) {
        postJobBtn.addEventListener('click', () => {
            showNotification('Redirecting to employer portal...', 'info');
            // Simulate redirect
            setTimeout(() => {
                showNotification('Feature coming soon! Contact us at +91-9667964138', 'success');
            }, 1500);
        });
    }

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Filter Setup
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const internshipCards = document.querySelectorAll('.internship-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            filterInternships(filter, internshipCards);
            currentFilter = filter;
        });
    });
}

function filterInternships(filter, cards) {
    cards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Form Setup
function setupForms() {
    const studentForm = document.getElementById('studentForm');
    const callbackForm = document.getElementById('callbackForm');

    if (studentForm) {
        studentForm.addEventListener('submit', handleStudentRegistration);
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', handleCallbackRequest);
    }

    // Setup apply buttons
    const applyBtns = document.querySelectorAll('.internship-card .btn-primary');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const internshipTitle = this.closest('.internship-card').querySelector('h3').textContent;
            handleInternshipApplication(internshipTitle);
        });
    });

    // Setup course enrollment buttons
    const enrollBtns = document.querySelectorAll('.course-card .btn-outline');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            handleCourseEnrollment(courseTitle);
        });
    });
}

function handleStudentRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateStudentForm(data)) {
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store registration data (in a real app, this would go to a server)
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('registrations', JSON.stringify(registrations));
        
        // Reset form and close modal
        e.target.reset();
        closeModal(document.getElementById('studentModal'));
        
        // Show success message
        showNotification('Registration successful! We\'ll contact you soon.', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleCallbackRequest(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateCallbackForm(data)) {
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Requesting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store callback request
        const callbacks = JSON.parse(localStorage.getItem('callbacks') || '[]');
        callbacks.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('callbacks', JSON.stringify(callbacks));
        
        // Reset form and close modal
        e.target.reset();
        closeModal(document.getElementById('callbackModal'));
        
        // Show success message
        showNotification('Callback requested! We\'ll call you within 24 hours.', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleInternshipApplication(internshipTitle) {
    showNotification(`Apply for ${internshipTitle}? Please register first!`, 'info');
    setTimeout(() => {
        openModal(document.getElementById('studentModal'));
    }, 1000);
}

function handleCourseEnrollment(courseTitle) {
    showNotification(`Enroll in ${courseTitle}? Contact us for more details!`, 'info');
    setTimeout(() => {
        openModal(document.getElementById('callbackModal'));
    }, 1000);
}

// Form Validation
function validateStudentForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.college || data.college.trim().length < 2) {
        errors.push('College name is required');
    }
    
    if (!data.course) {
        errors.push('Please select your course');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function validateCallbackForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.interest) {
        errors.push('Please select your area of interest');
    }
    
    if (!data.time) {
        errors.push('Please select preferred call time');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Setup close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        default: return '#667eea';
    }
}

// Animations Setup
function setupAnimations() {
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-message {
            white-space: pre-line;
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Contact WhatsApp Integration
function openWhatsApp() {
    const phoneNumber = '+919667964138';
    const message = 'Hi! I\'m interested in Hackveda Intern Tracker. Can you provide more information?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeUR