// Particle Bubbles for Hero Section
class ParticleSystem {
    constructor() {
        this.bubbleCount = 12;
        this.bubbleColors = [
            'rgba(56, 189, 248, 0.4)',
            'rgba(59, 130, 246, 0.4)',
            'rgba(96, 165, 250, 0.4)',
            'rgba(147, 197, 253, 0.4)'
        ];
        this.bubbleSizeRange = { min: 15, max: 40 };
        this.bubbles = [];
        this.container = null;
        this.init();
    }

    init() {
        // Find or create container
        this.container = document.querySelector('.bubbles') || this.createContainer();
        
        // Generate bubbles
        this.generateBubbles();
        
        // Add interaction
        this.addInteraction();
    }

    createContainer() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return null;

        const container = document.createElement('div');
        container.className = 'particle-bubbles';
        container.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        heroSection.appendChild(container);
        return container;
    }

    generateBubbles() {
        if (!this.container) return;

        for (let i = 0; i < this.bubbleCount; i++) {
            const bubble = this.createBubble();
            this.bubbles.push(bubble);
            this.container.appendChild(bubble);
        }
    }

    createBubble() {
        const bubble = document.createElement('div');
        const size = Math.random() * (this.bubbleSizeRange.max - this.bubbleSizeRange.min) + this.bubbleSizeRange.min;
        const color = this.bubbleColors[Math.floor(Math.random() * this.bubbleColors.length)];
        
        bubble.className = 'particle-bubble';
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, ${color}, rgba(255, 255, 255, 0.1));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatBubble ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            backdrop-filter: blur(2px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            pointer-events: auto;
            cursor: none;
        `;

        return bubble;
    }

    addInteraction() {
        this.bubbles.forEach(bubble => {
            bubble.addEventListener('click', () => {
                this.popBubble(bubble);
            });
        });
    }

    popBubble(bubble) {
        // Pop animation
        bubble.style.animation = 'popBubble 0.3s ease-out forwards';
        
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
                
                // Create new bubble to replace it
                setTimeout(() => {
                    const newBubble = this.createBubble();
                    newBubble.addEventListener('click', () => {
                        this.popBubble(newBubble);
                    });
                    
                    // Add to array and container
                    const index = this.bubbles.indexOf(bubble);
                    this.bubbles[index] = newBubble;
                    this.container.appendChild(newBubble);
                }, 1000);
            }
        }, 300);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatBubble {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 0.7;
        }
        75% {
            transform: translateY(-25px) translateX(5px) scale(1.05);
            opacity: 0.9;
        }
    }
    
    @keyframes popBubble {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
