/* ============================================
   SMART BDC — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile Menu Toggle ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar__links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ---------- Sticky Navbar Shadow ---------- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ---------- Scroll Fade-Up (IntersectionObserver) ---------- */
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        fadeEls.forEach(el => observer.observe(el));
    }

    /* ---------- Counter Animation ---------- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out quad
            const ease = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(ease * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ---------- Hero Particles ---------- */
    const particleContainer = document.querySelector('.hero__particles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.style.left = Math.random() * 100 + '%';
            span.style.top = (Math.random() * 100 + 100) + '%';
            span.style.width = span.style.height = (Math.random() * 4 + 2) + 'px';
            span.style.animationDuration = (Math.random() * 10 + 8) + 's';
            span.style.animationDelay = (Math.random() * 8) + 's';
            particleContainer.appendChild(span);
        }
    }

    /* ---------- Active Nav Link ---------- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ---------- Contact Form Validation ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation
            let valid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e53935';
                    valid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            // Email check
            const email = form.querySelector('[type="email"]');
            if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
                email.style.borderColor = '#e53935';
                valid = false;
            }
            if (valid) {
                // Replace form with success message
                form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem;">
            <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#1565c0,#29b6f6);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="margin-bottom:.5rem;">Thank You!</h3>
            <p style="color:#536171;margin:0 auto;">We've received your request. A Smart BDC specialist will be in touch within 24 hours.</p>
          </div>
        `;
            }
        });
    }

    /* ---------- Smooth Scroll for Anchor Links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
