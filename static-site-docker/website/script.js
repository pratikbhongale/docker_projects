// 1. Dynamic Typing Effect for your Title
const heroSubtitle = document.querySelector('.subtitle');
const text = "DevOps Engineer & Infrastructure Automator";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        heroSubtitle.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50); // Speed of typing
    }
}

// 2. Reveal Sections on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 3. Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    heroSubtitle.innerHTML = ""; // Clear existing text first
    typeEffect();

    // Apply scroll animations to cards
    const cards = document.querySelectorAll('.project-card, .skill-category');
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});

// Helper for the observer to toggle visibility
document.body.insertAdjacentHTML('beforeend', `
    <style>
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);