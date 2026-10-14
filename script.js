// Initialize AOS
AOS.init({
    duration: 1200,
    once: true,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
});

// Strict Device Detection and Content Injection
document.addEventListener('DOMContentLoaded', () => {
    const containers = [
        document.getElementById('download-container'),
        document.getElementById('download-container-footer')
    ];

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 1024;
    const isMobile = isMobileUA || isSmallScreen;

    containers.forEach(container => {
        if (!container) return;

        if (isMobile) {
            // MOBILE ONLY: Only show APK
            container.innerHTML = `
                <a href="downloads/Libby.apk" class="download-btn btn-primary">
                    <span class="btn-icon">📦</span>
                    <div class="btn-text">
                        <small>Get the App</small>
                        <span>Download APK</span>
                    </div>
                </a>
            `;
        } else {
            // DESKTOP ONLY: Only show Windows ZIP
            container.innerHTML = `
                <a href="downloads/Libby_Windows.zip" class="download-btn btn-primary">
                    <span class="btn-icon">🪟</span>
                    <div class="btn-text">
                        <small>Desktop Experience</small>
                        <span>Download for Windows</span>
                    </div>
                </a>
            `;
        }
    });

    // Custom "Page Turn" Scroll Interaction
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            const rotation = -10 + (scrolled * 0.05);
            const clampedRotation = Math.min(Math.max(rotation, -10), 0);
            heroImg.style.transform = `perspective(1500px) rotateY(${clampedRotation}deg) rotateX(5deg)`;
        }

        // Stick/Fade Nav
        const nav = document.querySelector('.glass-nav');
        if (scrolled > 50) {
            nav.style.padding = '18px 10%';
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            nav.style.padding = '24px 10%';
            nav.style.background = 'rgba(15, 23, 42, 0.85)';
        }

        // Active state for mobile tab bar
        const sections = ['hero', 'features', 'philosophy', 'download'];
        const tabItems = document.querySelectorAll('.tab-item');
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const offset = section.offsetTop - 150;
                if (scrolled >= offset) {
                    tabItems.forEach(item => item.classList.remove('active'));
                    tabItems[index].classList.add('active');
                }
            }
        });
    });
});
