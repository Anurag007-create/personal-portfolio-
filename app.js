// Portfolio data
const portfolioData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 2,
        title: "Mobile Banking App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        description: "Secure mobile banking application with biometric authentication",
        technologies: ["React Native", "Firebase", "Redux"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Brand Identity Design",
        category: "design",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
        description: "Complete brand identity package for tech startup",
        technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 4,
        title: "Data Visualization Dashboard",
        category: "web",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        description: "Interactive dashboard for business analytics and reporting",
        technologies: ["Vue.js", "D3.js", "Express.js"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 5,
        title: "AI-Powered Chatbot",
        category: "ai",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
        description: "Intelligent customer service chatbot with natural language processing",
        technologies: ["Python", "TensorFlow", "FastAPI"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 6,
        title: "Social Media Campaign",
        category: "design",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        description: "Creative social media campaign with engaging visual content",
        technologies: ["After Effects", "Illustrator", "Premiere Pro"],
        liveUrl: "#",
        githubUrl: "#"
    }
];

// Global variables
let currentTestimonial = 0;
let particlesCanvas, particlesCtx;
let particles = [];
let animationId;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    showLoadingScreen();
    initParticles();
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initHeroAnimations();
    initPortfolio();
    initTestimonials();
    initContactForm();
    initIntersectionObserver();
    
    // Hide loading screen after everything is initialized
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);
}

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loader-progress-bar');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
}

// Enhanced Particles Animation
function initParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;
    
    particlesCtx = particlesCanvas.getContext('2d');
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.min(150, Math.max(50, window.innerWidth / 8));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            size: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.6 + 0.3,
            pulse: Math.random() * 0.02 + 0.01
        });
    }
}

function animateParticles() {
    if (!particlesCtx || !particlesCanvas) return;
    
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    const theme = document.body.getAttribute('data-theme');
    const particleColor = theme === 'dark' ? '0, 255, 136' : '0, 123, 255';
    
    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > particlesCanvas.width) {
            particle.speedX *= -1;
            particle.x = Math.max(0, Math.min(particlesCanvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > particlesCanvas.height) {
            particle.speedY *= -1;
            particle.y = Math.max(0, Math.min(particlesCanvas.height, particle.y));
        }
        
        // Pulse effect
        particle.opacity += particle.pulse;
        if (particle.opacity >= 0.8 || particle.opacity <= 0.2) {
            particle.pulse *= -1;
        }
        
        // Draw particle
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesCtx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        particlesCtx.fill();
        
        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 600;
                    particlesCtx.beginPath();
                    particlesCtx.moveTo(particle.x, particle.y);
                    particlesCtx.lineTo(otherParticle.x, otherParticle.y);
                    particlesCtx.strokeStyle = `rgba(${particleColor}, ${opacity})`;
                    particlesCtx.lineWidth = 1;
                    particlesCtx.stroke();
                }
            }
        });
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    if (!hamburger || !navMenu || !navbar) return;
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect and active link highlighting
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Theme Toggle - Enhanced functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class to body
        body.classList.add('theme-transitioning');
        
        // Change theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Recreate particles with new colors
        createParticles();
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
}

// Scroll Effects
function initScrollEffects() {
    const scrollProgress = document.querySelector('.progress-bar');
    const backToTop = document.getElementById('back-to-top');
    
    if (!scrollProgress || !backToTop) return;
    
    window.addEventListener('scroll', () => {
        // Scroll progress
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / documentHeight) * 100, 100);
        scrollProgress.style.width = scrollPercent + '%';
        
        // Back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hero Animations - Enhanced typing effect
function initHeroAnimations() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Creative Problem Solver',
        'Tech Enthusiast',
        'Innovation Driver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1500);
}

// Portfolio
function initPortfolio() {
    renderPortfolioItems();
    initPortfolioFilters();
    initPortfolioModal();
}

function renderPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = portfolioData.map((project, index) => `
        <div class="portfolio-item" data-category="${project.category}" data-id="${project.id}" style="animation-delay: ${index * 0.1}s">
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-links">
                        <a href="${project.liveUrl}" target="_blank" class="portfolio-link" onclick="event.stopPropagation();" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.githubUrl}" target="_blank" class="portfolio-link" onclick="event.stopPropagation();" title="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = parseInt(item.dataset.id);
            openPortfolioModal(projectId);
        });
    });
}

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items with animation
            portfolioItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (!modal || !modalClose || !modalOverlay) return;
    
    modalClose.addEventListener('click', closePortfolioModal);
    modalOverlay.addEventListener('click', closePortfolioModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePortfolioModal();
        }
    });
}

function openPortfolioModal(projectId) {
    const project = portfolioData.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <div class="modal-info">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-description">${project.description}</p>
                <div class="modal-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-links">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn--primary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="btn btn--outline">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Testimonials - Enhanced carousel
function initTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!testimonialItems.length) return;
    
    let autoPlayInterval;
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = currentTestimonial === 0 ? testimonialItems.length - 1 : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopAutoPlay();
        startAutoPlay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopAutoPlay();
        startAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

// Contact Form - Enhanced validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactSubmission();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNewsletterSubmission();
        });
    }
    
    // Real-time validation
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('blur', validateField);
        control.addEventListener('input', clearValidationError);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate based on field type
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
}

function clearValidationError(event) {
    event.target.classList.remove('error');
}

function handleContactSubmission() {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate all fields
    const formControls = document.querySelectorAll('#contact-form .form-control');
    let isFormValid = true;
    
    formControls.forEach(control => {
        validateField({ target: control });
        if (control.classList.contains('error')) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.classList.remove('hidden');
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterSubmission() {
    const input = document.querySelector('.newsletter-input');
    const email = input.value.trim();
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate subscription
    setTimeout(() => {
        input.value = '';
        showNotification('Thank you for subscribing to our newsletter!', 'success');
    }, 1000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '10px',
        zIndex: '10001',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        fontSize: '14px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Skills animation
                if (target.classList.contains('skills')) {
                    setTimeout(() => animateSkills(), 200);
                }
                
                // Statistics animation
                if (target.classList.contains('about')) {
                    setTimeout(() => animateStatistics(), 200);
                }
                
                // Add animation class to elements
                target.classList.add('animate');
                
                // Unobserve after animation
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Skills Animation - Enhanced
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const skillLevel = bar.dataset.skill;
            bar.style.width = skillLevel + '%';
            
            // Add glow effect during animation
            bar.style.boxShadow = `0 0 10px rgba(0, 255, 136, 0.5)`;
            setTimeout(() => {
                bar.style.boxShadow = 'none';
            }, 2000);
        }, index * 100);
    });
}

// Statistics Animation - Enhanced counter
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, stepTime);
    });
}

// Add smooth fade out animation for portfolio items
const fadeOutKeyframes = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;

// Inject fadeOut animation
const styleSheet = document.createElement('style');
styleSheet.textContent = fadeOutKeyframes;
document.head.appendChild(styleSheet);

// Add error styles for form validation
const formErrorStyles = `
    .form-control.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
        border-radius: 3px;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .theme-transitioning {
        transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    
    .theme-transitioning * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
`;

const errorStyleSheet = document.createElement('style');
errorStyleSheet.textContent = formErrorStyles;
document.head.appendChild(errorStyleSheet);

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

// Performance optimizations
window.addEventListener('resize', debounce(() => {
    resizeCanvas();
    createParticles();
}, 250));

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Prevent flash of unstyled content
document.documentElement.style.visibility = 'visible';