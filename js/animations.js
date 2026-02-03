/* ===================================
   INTERSECTION OBSERVER & ANIMATIONS
   =================================== */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHoverEffects();
  initSmoothScroll();
});

/**
 * Initialize scroll-triggered animations using IntersectionObserver
 */
function initScrollAnimations() {
  // Configuration for the observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Callback for when elements enter viewport
  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add active class to trigger animation
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 60); // Stagger delay
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements with reveal classes
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .timeline-item');
  revealElements.forEach(el => observer.observe(el));
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
  // Project cards expand on hover
  const projectCards = document.querySelectorAll('.card--project');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Interest items playful interaction
  const interestItems = document.querySelectorAll('.interest-item');
  interestItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('.interest-icon');
      icon.style.transform = 'rotate(5deg) scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('.interest-icon');
      icon.style.transform = 'rotate(0deg) scale(1)';
    });
  });

  // Skill cards accent line animation
  const skillCards = document.querySelectorAll('.card--skill');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent-primary)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'transparent';
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80; // Account for any fixed header
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add parallax effect to hero section (subtle)
 */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero__content');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

/**
 * Lazy load optimization
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
