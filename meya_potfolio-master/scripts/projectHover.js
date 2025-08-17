// Project Hover Image Effect
class ProjectHoverEffect {
    constructor() {
        this.hoverImage = null;
        this.currentProject = null;
        this.init();
    }

    init() {
        this.createHoverImage();
        this.addEventListeners();
    }

    createHoverImage() {
        this.hoverImage = document.createElement('div');
        this.hoverImage.className = 'project-hover-image';
        this.hoverImage.style.cssText = `
            position: fixed;
            width: 200px;
            height: 150px;
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.3s ease, transform 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid var(--blue-lighter);
        `;
        document.body.appendChild(this.hoverImage);
    }

    addEventListeners() {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(project => {
            const projectImg = project.querySelector('.project-image img');
            if (!projectImg) return;

            project.addEventListener('mouseenter', (e) => {
                this.showHoverImage(projectImg.src);
            });

            project.addEventListener('mouseleave', () => {
                this.hideHoverImage();
            });

            project.addEventListener('mousemove', (e) => {
                this.updateImagePosition(e);
            });
        });
    }

    showHoverImage(imageSrc) {
        this.hoverImage.style.backgroundImage = `url(${imageSrc})`;
        this.hoverImage.style.opacity = '1';
        this.hoverImage.style.transform = 'scale(1)';
    }

    hideHoverImage() {
        this.hoverImage.style.opacity = '0';
        this.hoverImage.style.transform = 'scale(0.8)';
    }

    updateImagePosition(e) {
        const offset = 20;
        this.hoverImage.style.left = (e.clientX + offset) + 'px';
        this.hoverImage.style.top = (e.clientY + offset) + 'px';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectHoverEffect();
});

// ✅ Project Filter Function
function filterProjects(type, event) {
    // remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // add active class to the clicked button
    if (event) event.target.classList.add('active');

    // loop through all projects
    document.querySelectorAll('.project-item').forEach(item => {
        if (item.classList.contains(type)) {
            item.style.display = "";   // ✅ resets to CSS default (flex/grid/etc.)
        } else {
            item.style.display = "none"; 
        }
    });
}
