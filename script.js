// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Typed.js functionality for hero section
document.addEventListener('DOMContentLoaded', function() {
    const txtRotate = document.querySelector('.txt-rotate');
    if (txtRotate) {
        const phrases = JSON.parse(txtRotate.getAttribute('data-rotate'));
        let currentPhraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let pauseTime = 2000;

        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (!isDeleting && charIndex < currentPhrase.length) {
                txtRotate.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                txtRotate.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            }
        }
        
        setTimeout(type, 500);
    }
});

// Tab functionality for portfolio section
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Stats counter animation
function animateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    
    statElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // Animation duration in ms
        const increment = target / (duration / 16); // 60fps approximation
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger stats animation when achievements section comes into view
            if (entry.target.id === 'achievements') {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.animate-on-scroll, .skill-card, .expertise-item, .portfolio-item, .stat-box, .contact-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function parallax() {
    posX += (mouseX - posX) / 20;
    posY += (mouseY - posY) / 20;
    
    const heroElements = document.querySelectorAll('.hero-content, .hero-title, .hero-subtitle, .hero-avatar');
    
    heroElements.forEach(element => {
        const speedX = parseFloat(element.getAttribute('data-speed-x')) || 0.02;
        const speedY = parseFloat(element.getAttribute('data-speed-y')) || 0.02;
        
        element.style.transform = `translate(${posX * speedX}px, ${posY * speedY}px)`;
    });
    
    requestAnimationFrame(parallax);
}

// Start parallax effect
parallax();

// Ripple effect for interactive elements
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.querySelectorAll('.contact-link, .tab-button, .value-tag').forEach(button => {
    button.addEventListener("click", createRipple);
});

// Add ripple effect to section headers
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener("click", createRipple);
});

// Handle form submission if there's a contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // In a real implementation, you would send the data to a server here
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            form.reset();
        });
    });
});

// Particle animation for background
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 10 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', createParticles);

// Add tilt effect to cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.glass-card, .skill-card, .expertise-item, .portfolio-item, .stat-box, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = ((x - centerX) / centerX) * 5; // Max 5 degrees rotation
            const angleX = ((centerY - y) / centerY) * 5; // Max 5 degrees rotation
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize tilt effect when DOM is loaded
document.addEventListener('DOMContentLoaded', initTiltEffect);

// Handle scroll events for navbar background change
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 14, 23, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add scroll reveal effect to all sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    sectionObserver.observe(section);
});

// Dynamic follower count update (simulated)
function updateFollowerCount() {
    const followerElement = document.querySelector('[data-target="5000"]');
    if (followerElement) {
        // Simulate fetching from X profile
        const simulatedCount = 4850 + Math.floor(Math.random() * 300); // Simulated live count
        followerElement.setAttribute('data-target', simulatedCount);
    }
}

// Update follower count periodically
setInterval(updateFollowerCount, 30000); // Update every 30 seconds

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Prehtagonist Portfolio loaded successfully!');
    
    // Add any additional initialization code here
});