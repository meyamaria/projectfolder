// Enhanced Main Script with Smooth Interactions
class PortfolioMain {
    constructor() {
        this.currentSection = 'home';
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.setupLoadingAnimation();
    }

    setupNavigation() {
        // Enhanced smooth scrolling with easing
        window.scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element && !this.isScrolling) {
                this.isScrolling = true;
                
                // Update active nav button immediately
                this.updateActiveNavButton(sectionId);
                
                // Smooth scroll with custom easing
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // Reset scrolling flag after animation
                setTimeout(() => {
                    this.isScrolling = false;
                }, 1000);
            }
        };

        // Enhanced scroll spy
        this.setupScrollSpy();
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('.section');
        const navBtns = document.querySelectorAll('.nav-btn');

        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isScrolling) {
                    const currentSection = entry.target.getAttribute('id');
                    this.currentSection = currentSection;
                    this.updateActiveNavButton(currentSection);
                }
            });
        }, {
            threshold: 0.6,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => {
            scrollSpyObserver.observe(section);
        });
    }

    updateActiveNavButton(sectionId) {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === sectionId) {
                btn.classList.add('active');
            }
        });
    }

    setupScrollEffects() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Navbar background opacity based on scroll
        const navbar = document.querySelector('.nav-container');
        if (navbar) {
            const opacity = Math.min(scrollY / 100, 1);
            navbar.style.backgroundColor = `rgba(30, 41, 59, ${0.8 + opacity * 0.2})`;
        }

        // Parallax effects for various elements
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0) {
                const parallaxOffset = scrollY * 0.3;
                const bubbleWrapper = heroSection.querySelector('.bubble-wrapper');
                if (bubbleWrapper) {
                    bubbleWrapper.style.transform = `translateY(${parallaxOffset}px) scale(${1 - scrollY * 0.0003})`;
                }
            }
        }
    }

    setupInteractiveElements() {
        // Enhanced button interactions
        const buttons = document.querySelectorAll('.nav-btn, .social-link, .project-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Project cards enhanced interaction
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    setupLoadingAnimation() {
        // Initial load animation
        window.addEventListener('load', () => {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.classList.add('animate-in');
            }

            // Stagger animation for nav buttons
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.transform = 'translateY(0)';
                    btn.style.opacity = '1';
                }, index * 100);
            });
        });
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    .nav-btn {
        transform: translateY(-10px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .hero-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease;
    }

    .hero-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .project-item {
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);

// Initialize main functionality
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioMain();
});

// Legacy functions for compatibility
function scrollToSection(sectionId) {
    window.scrollToSection(sectionId);
}
