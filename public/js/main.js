// GSAP Animations and UI Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const heroTl = gsap.timeline();

    heroTl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.5
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out'
    }, '-=0.4')
    .to('.hero-btns', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out'
    }, '-=0.4');

    // Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal animations on scroll
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    // Achievements Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCounter = () => {
            const current = +counter.innerText;
            const increment = target / 100;

            if (current < target) {
                counter.innerText = (current + increment).toFixed(target % 1 === 0 ? 0 : 2);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };

        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: updateCounter
        });
    });
    // Nav Scroll Effect
    window.addEventListener('scroll', () => {
        const navWrapper = document.getElementById('navWrapper');
        const nav = document.getElementById('mainNav');
        if (!navWrapper || !nav) return;
        
        if (window.scrollY > 20) {
            navWrapper.classList.remove('top-6');
            navWrapper.classList.add('top-0', 'py-4');
            nav.classList.add('shadow-2xl', 'bg-white/95');
            nav.classList.remove('max-w-7xl');
            nav.classList.add('max-w-full', 'rounded-none', 'border-none');
        } else {
            navWrapper.classList.add('top-6');
            navWrapper.classList.remove('top-0', 'py-4');
            nav.classList.remove('shadow-2xl', 'bg-white/95');
            nav.classList.add('max-w-7xl');
            nav.classList.remove('max-w-full', 'rounded-full', 'border-none');
            nav.classList.add('rounded-full');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }
});
