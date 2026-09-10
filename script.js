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
            navLinks.classList.toggle('mobile-active');
            
            // Toggle hamburger to close icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Window resize listener to reset nav style on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });
});
