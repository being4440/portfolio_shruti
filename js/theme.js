/* ===================================
   THEME & SUBTLE INTERACTIONS
   =================================== */

// Initialize theme functionality
document.addEventListener('DOMContentLoaded', () => {
    initPlayfulDot();
    initTagInteractions();
    initButtonEffects();
});

/**
 * Playful dot appears on hero title hover
 */
function initPlayfulDot() {
    const heroTitle = document.querySelector('.hero__title');

    if (heroTitle) {
        let dotShown = false;

        heroTitle.addEventListener('mouseenter', () => {
            if (!dotShown) {
                const dot = heroTitle.querySelector('.playful-dot');
                if (dot) {
                    dot.style.opacity = '1';
                    dot.style.transform = 'scale(1)';
                    dotShown = true;
                }
            }
        });
    }
}

/**
 * Tag hover interactions with shimmer effect
 */
function initTagInteractions() {
    const tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Button ripple and interaction effects
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';

            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            ripple.style.opacity = '1';

            this.appendChild(ripple);

            // Animate ripple
            setTimeout(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(20)';
                ripple.style.opacity = '0';
            }, 10);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Subtle color mode handling (optional for future enhancement)
 * Currently just sets up the structure for potential dark mode
 */
function initColorMode() {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('colorMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // For now, we're keeping it light mode only
    // This is a placeholder for future enhancement
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        // Future: Apply dark mode classes
    }
}

/**
 * Add micro-interaction feedback to links
 */
document.querySelectorAll('a:not(.btn)').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.color = 'var(--accent-warm)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.color = 'var(--accent-primary)';
    });
});

/**
 * Keyboard navigation enhancement
 */
document.addEventListener('keydown', (e) => {
    // Add visual feedback for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/**
 * Performance: Debounce scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce };
}
