document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Scroll Animation (Fade Up) using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번만 애니메이션 실행
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 3. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }
    });

    // 4. Tooltip Logic for Footnotes
    const tooltips = document.querySelectorAll('.footnote-trigger');
    const tooltipEl = document.getElementById('tooltip');

    tooltips.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');
            tooltipEl.textContent = text;
            tooltipEl.classList.add('visible');
            
            // Calculate position
            const rect = e.target.getBoundingClientRect();
            tooltipEl.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
            tooltipEl.style.top = `${rect.top + window.scrollY - tooltipEl.offsetHeight - 10}px`;
        });

        trigger.addEventListener('mouseleave', () => {
            tooltipEl.classList.remove('visible');
        });
    });
});
