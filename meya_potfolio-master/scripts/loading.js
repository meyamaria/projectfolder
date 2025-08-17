// Loading Animation System
class LoadingSystem {
    constructor() {
        this.loadingScreen = null;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.startLoading();
    }

    createLoadingScreen() {
        this.loadingScreen = document.createElement('div');
        this.loadingScreen.className = 'loading-screen';
        this.loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">MT</div>
                <div class="loading-text">
                    <div class="loading-name">Meya Maria Tony</div>
                    <div class="loading-subtitle">Portfolio</div>
                </div>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
            <div class="loading-particles">
                <div class="loading-particle"></div>
                <div class="loading-particle"></div>
                <div class="loading-particle"></div>
                <div class="loading-particle"></div>
                <div class="loading-particle"></div>
            </div>
        `;
        
        document.body.appendChild(this.loadingScreen);
    }

    startLoading() {
        const progressBar = this.loadingScreen.querySelector('.progress-bar');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                progressBar.style.width = '100%';
                clearInterval(interval);
                
                setTimeout(() => {
                    this.finishLoading();
                }, 300);
            } else {
                progressBar.style.width = progress + '%';
            }
        }, 150);
    }

    finishLoading() {
        this.loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            document.body.removeChild(this.loadingScreen);
            document.body.classList.add('loaded');
            
            // Trigger hero animation
            this.triggerHeroAnimation();
        }, 600);
    }

    triggerHeroAnimation() {
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroSection) {
            setTimeout(() => heroContent?.classList.add('animate-in'), 200);
            setTimeout(() => heroImage?.classList.add('animate-in'), 400);
        }
    }
}

// Add loading screen styles
const style = document.createElement('style');
style.textContent = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #F0F9FF, #E0F2FE);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.6s ease, visibility 0.6s ease;
    }

    .loading-screen.fade-out {
        opacity: 0;
        visibility: hidden;
    }

    .loading-content {
        text-align: center;
        position: relative;
        z-index: 2;
    }

    .loading-logo {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(45deg, var(--navy-light), var(--blue-tint));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: white;
        animation: logoSpin 2s ease-in-out infinite;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    }

    @keyframes logoSpin {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); }
    }

    .loading-name {
        font-size: 28px;
        font-weight: 600;
        color: #0F172A;
        margin-bottom: 8px;
        animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .loading-subtitle {
        font-size: 16px;
        color: #3B82F6;
        margin-bottom: 30px;
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }

    .loading-progress {
        width: 200px;
        height: 4px;
        background: rgba(59, 130, 246, 0.2);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }

    .progress-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #3B82F6, #38BDF8);
        border-radius: 2px;
        transition: width 0.3s ease;
    }

    .loading-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .loading-particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #38BDF8;
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat 3s ease-in-out infinite;
    }

    .loading-particle:nth-child(1) {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }

    .loading-particle:nth-child(2) {
        top: 70%;
        left: 20%;
        animation-delay: 0.6s;
    }

    .loading-particle:nth-child(3) {
        top: 30%;
        right: 15%;
        animation-delay: 1.2s;
    }

    .loading-particle:nth-child(4) {
        bottom: 20%;
        right: 25%;
        animation-delay: 1.8s;
    }

    .loading-particle:nth-child(5) {
        top: 60%;
        left: 70%;
        animation-delay: 2.4s;
    }

    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px);
            opacity: 1;
        }
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Hide body content until loaded */
    body:not(.loaded) .nav-container,
    body:not(.loaded) .hero-section,
    body:not(.loaded) .about-section,
    body:not(.loaded) .projects-section,
    body:not(.loaded) .contact-section {
        opacity: 0;
    }

    /* Hero animation enhancements */
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .hero-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .hero-image {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s ease;
    }

    .hero-image.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Initialize loading system immediately
document.addEventListener('DOMContentLoaded', () => {
    new LoadingSystem();
});
