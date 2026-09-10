document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Load Animations (Hero & Navbar) ---
    const navBar = document.querySelector('.reveal-nav');
    if(navBar) {
        setTimeout(() => navBar.classList.add('active'), 100);
    }

    const heroElements = document.querySelectorAll('.reveal-hero');
    heroElements.forEach((el, index) => {
        // Stagger the hero text and image reveals
        setTimeout(() => {
            el.classList.add('active');
        }, 200 + (index * 150)); 
    });


    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Observer options: triggers when 15% of the element is visible in viewport
    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the active class to trigger CSS transition
                entry.target.classList.add('active');
                
                // Stop observing once animated (so it only animates once)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.opacity = '0';
                setTimeout(() => navLinks.style.display = 'none', 300);
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '2rem 0';
                navLinks.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                navLinks.style.textAlign = 'center';
                
                // Smooth fade in
                navLinks.style.opacity = '0';
                navLinks.style.transition = 'opacity 0.3s ease';
                setTimeout(() => navLinks.style.opacity = '1', 10);
            }
        });
    }

    // Window resize listener to reset nav style on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            navLinks.style.opacity = '1';
            navLinks.style.backgroundColor = 'transparent';
        } else {
            navLinks.style.display = 'none';
        }
    });
});
