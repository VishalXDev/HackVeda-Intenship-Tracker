let isScrolled = false;

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollEffects();
    setupModals();
    setupForms();
    setupSmoothScrolling();
});

function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', e => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 100 && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 100 && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    });
}

function setupModals() {
    const modals = {
        student: document.getElementById('studentModal'),
        callback: document.getElementById('callbackModal')
    };

    const triggers = {
        student: document.getElementById('studentRegister'),
        callback: document.getElementById('getCallback'),
        signup: document.getElementById('getStarted')
    };

    const closeButtons = document.querySelectorAll('.close');

    if (triggers.student) triggers.student.onclick = () => openModal(modals.student);
    if (triggers.callback) triggers.callback.onclick = () => openModal(modals.callback);
    if (triggers.signup) triggers.signup.onclick = () => openModal(modals.student);

    closeButtons.forEach(btn =>
        btn.addEventListener('click', () => closeModal(btn.closest('.modal')))
    );

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupForms() {
    const studentForm = document.getElementById('studentForm');
    const callbackForm = document.getElementById('callbackForm');

    if (studentForm) {
        studentForm.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(studentForm));
            if (!data.name || !data.email || !data.phone) {
                alert('Please fill all required student details.');
                return;
            }
            localStorage.setItem('studentRegistration', JSON.stringify(data));
            studentForm.reset();
            closeModal(document.getElementById('studentModal'));
            alert('Thanks for registering!');
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(callbackForm));
            if (!data.name || !data.phone) {
                alert('Please fill all required callback details.');
                return;
            }
            localStorage.setItem('callbackRequest', JSON.stringify(data));
            callbackForm.reset();
            closeModal(document.getElementById('callbackModal'));
            alert('Callback requested successfully!');
        });
    }
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}