class MobilePortfolio {
    constructor() {
        this.currentSection = 'about';
        this.init();
    }

    init() {
        this.setupTime();
        this.setupNavigation();
        this.setupIntersectionObserver();
    }

    setupTime() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            document.getElementById('current-time').textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionName = item.dataset.section;
                this.scrollToSection(sectionName);
                this.setActiveNav(item);
            });
        });
    }

    scrollToSection(sectionName) {
        const section = document.querySelector(`.${sectionName}-section`);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setActiveNav(activeItem) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('.content-section');
        const navItems = document.querySelectorAll('.nav-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionClass = entry.target.classList[1]; // Gets 'about-section', 'projects-section', etc.
                    const sectionName = sectionClass.replace('-section', '');
                    
                    navItems.forEach(item => item.classList.remove('active'));
                    const activeNav = document.querySelector(`[data-section="${sectionName}"]`);
                    if (activeNav) {
                        activeNav.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-50px 0px -50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Initialize the portfolio when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MobilePortfolio();
});