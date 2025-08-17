// Keyboard Navigation Enhancement
class KeyboardNavigation {
    constructor() {
        this.currentSectionIndex = 0;
        this.sections = ['home', 'about', 'projects', 'contact'];
        this.init();
    }

    init() {
        this.addKeyboardListeners();
        this.addArrowKeyNavigation();
    }

    addKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            // Prevent navigation when user is typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                case 'j':
                    e.preventDefault();
                    this.navigateNext();
                    break;
                case 'ArrowUp':
                case 'k':
                    e.preventDefault();
                    this.navigatePrevious();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    e.preventDefault();
                    this.navigateToSection(parseInt(e.key) - 1);
                    break;
                case 'Escape':
                    this.resetFocus();
                    break;
                case 'Enter':
                    if (e.target.classList.contains('nav-btn')) {
                        e.target.click();
                    }
                    break;
            }
        });
    }

    addArrowKeyNavigation() {
        // Add visual indicators
        this.createNavigationHint();
    }

    navigateNext() {
        this.currentSectionIndex = (this.currentSectionIndex + 1) % this.sections.length;
        this.navigateToCurrentSection();
    }

    navigatePrevious() {
        this.currentSectionIndex = (this.currentSectionIndex - 1 + this.sections.length) % this.sections.length;
        this.navigateToCurrentSection();
    }

    navigateToSection(index) {
        if (index >= 0 && index < this.sections.length) {
            this.currentSectionIndex = index;
            this.navigateToCurrentSection();
        }
    }

    navigateToCurrentSection() {
        const sectionId = this.sections[this.currentSectionIndex];
        window.scrollToSection(sectionId);
        
        // Add visual feedback
        this.showNavigationFeedback(sectionId);
    }

    showNavigationFeedback(sectionId) {
        // Create or update navigation indicator
        let indicator = document.querySelector('.keyboard-nav-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'keyboard-nav-indicator';
            document.body.appendChild(indicator);
        }

        const sectionNames = {
            'home': 'Home',
            'about': 'About',
            'projects': 'Projects', 
            'contact': 'Contact'
        };

        indicator.textContent = sectionNames[sectionId] || sectionId;
        indicator.classList.add('show');

        setTimeout(() => {
            indicator.classList.remove('show');
        }, 1500);
    }

    createNavigationHint() {
        const hint = document.createElement('div');
        hint.className = 'keyboard-nav-hint';
        hint.innerHTML = `
            <div class="hint-title">Keyboard Shortcuts</div>
            <div class="hint-item">↑↓ or J/K: Navigate sections</div>
            <div class="hint-item">1-4: Jump to section</div>
            <div class="hint-item">ESC: Reset focus</div>
        `;
        document.body.appendChild(hint);

        // Show hint briefly on load
        setTimeout(() => {
            hint.classList.add('show');
        }, 2000);

        setTimeout(() => {
            hint.classList.remove('show');
        }, 5000);
    }

    resetFocus() {
        document.activeElement?.blur();
        this.currentSectionIndex = 0;
    }
}

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav-indicator {
        position: fixed;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        background: linear-gradient(45deg, var(--navy-dark), var(--blue-tint));
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 14px;
        opacity: 0;
        transform: translateY(-50%) translateX(100px);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
        backdrop-filter: blur(10px);
    }

    .keyboard-nav-indicator.show {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
    }

    .keyboard-nav-hint {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(30, 41, 59, 0.95);
        color: white;
        padding: 16px 20px;
        border-radius: 15px;
        font-size: 12px;
        line-height: 1.5;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.4s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .keyboard-nav-hint.show {
        opacity: 1;
        transform: translateY(0);
    }

    .keyboard-nav-hint .hint-title {
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--blue-lighter);
    }

    .keyboard-nav-hint .hint-item {
        margin-bottom: 4px;
        opacity: 0.9;
    }

    .keyboard-nav-hint .hint-item:last-child {
        margin-bottom: 0;
    }

    /* Focus indicators for better accessibility */
    .nav-btn:focus {
        outline: 2px solid var(--blue-tint);
        outline-offset: 2px;
    }

    .project-link:focus,
    .social-link:focus {
        outline: 2px solid var(--blue-tint);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    new KeyboardNavigation();
});
