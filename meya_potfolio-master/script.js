function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active nav button
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Initial load - make first section visible
        window.addEventListener('load', () => {
            document.querySelector('.section').classList.add('visible');
        });

        // Update active nav button on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navBtns = document.querySelectorAll('.nav-btn');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase() === current) {
                    btn.classList.add('active');
                }
            });
        });

        // Add some interactive effects
        document.addEventListener('mousemove', (e) => {
            const circles = document.querySelectorAll('.circle');
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.02;
                const x = (e.clientX * speed);
                const y = (e.clientY * speed);
                circle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });