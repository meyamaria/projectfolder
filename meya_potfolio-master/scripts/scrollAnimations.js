// Scroll-based animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
        this.addScrollEffects();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        // Observe sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            this.observer.observe(section);
        });

        // Observe project items
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            this.observer.observe(item);
        });

        // Observe other elements
        const animateElements = document.querySelectorAll('.about-content, .contact-info');
        animateElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');

        // Special animations for different elements
        if (element.classList.contains('project-item')) {
            this.animateProjectItem(element);
        } else if (element.classList.contains('section')) {
            this.animateSectionContent(element);
        }
    }

    animateProjectItem(projectItem) {
        const projectImage = projectItem.querySelector('.project-image');
        const projectInfo = projectItem.querySelector('.project-info');

        if (projectImage && projectInfo) {
            setTimeout(() => {
                projectImage.style.transform = 'translateX(0)';
                projectImage.style.opacity = '1';
            }, 200);

            setTimeout(() => {
                projectInfo.style.transform = 'translateX(0)';
                projectInfo.style.opacity = '1';
            }, 400);
        }
    }

    animateSectionContent(section) {
        const title = section.querySelector('.section-title, .about-title');
        const content = section.querySelector('.projects-container, .about-content, .contact-content');

        if (title) {
            setTimeout(() => {
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }, 100);
        }

        if (content) {
            setTimeout(() => {
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }, 300);
        }
    }

    addScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection) {
                const heroOffset = heroSection.offsetTop;
                const heroHeight = heroSection.offsetHeight;
                
                if (scrolled < heroOffset + heroHeight) {
                    const parallaxSpeed = 0.5;
                    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }
            }
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.25, 0.25, 1);
    }

    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .project-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .project-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .project-image {
        transform: translateX(-50px);
        opacity: 0;
        transition: all 0.6s ease;
    }

    .project-info {
        transform: translateX(50px);
        opacity: 0;
        transition: all 0.6s ease;
    }

    .section-title, .about-title {
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.5s ease;
    }

    .projects-container, .about-content, .contact-content {
        transform: translateY(30px);
        opacity: 0;
        transition: all 0.7s ease;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            transition: none !important;
            animation: none !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
