// Profile Image Load Animation
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Fallback: If image is already loaded (from cache)
    if (profileImage.complete) {
        profileImage.classList.add('loaded');
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Create mobile navigation overlay
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `
    <a href="#home">Home</a>
    <a href="#resume">Resume</a>
    <a href="#projects">Projects</a>
    <a href="#challenges">Lab Challenges</a>
    <a href="#contact">Contact</a>
`;
document.body.appendChild(mobileNav);

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

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
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe resume cards
document.querySelectorAll('.resume-card, .project-card, .challenge-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
