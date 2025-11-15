// --- DATA ---
const roles = ["Fullstack Developer", "UI Designer", "Graphics Designer", "Problem Solver", "Innovator"];
const testimonials = [
    { quote: "Bhupesh transformed our sluggish legacy platform into a rapid, responsive interface. His attention to performance optimization while building the custom components was exceptional. The user adoption rates doubled within the first month.", name: "Dr. Anya Sharma", company: "CTO, Meridian Financial" },
    { quote: "We came with a vague concept, and he turned it into a polished, high-conversion landing page. The process was transparent, and the final product looked incredible on every device. Our lead generation spiked by 40%.", name: "David 'Buzz' Williams", company: "Marketing Director, AuraStream" },
    { quote: "The speed at which he integrated complex APIs into a seamless front-end was astounding. He’s not just a coder; he's a strategic partner who anticipates problems before they arise. A phenomenal experience.", name: "Chloe Dupont", company: "Project Lead, Quantum Labs" },
    { quote: "Bhupesh's UI design is genuinely unique. It’s elegant, modern, and intuitively guides the user. The dashboard he built for us receives constant praise for its clarity and aesthetic appeal.", name: "Marcus Klein", company: "Product Manager, Edge Analytics" },
    { quote: "We were worried about scaling, but his clean, modular React architecture made future development painless. It was the most future-proof code base we've ever launched with. Highly professional and reliable.", name: "Jamal Adebayo", company: "Founder, ByteWave" },
];

// --- DOM ELEMENTS & INITIALIZATION ---
const testimonialsGridElement = document.getElementById('testimonials-grid'); // New element
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const typingTextElement = document.getElementById('typing-text');
const currentYearEl = document.getElementById('current-year');
const nav = document.getElementById('navbar');

// Removed: slider, nextBtn, prevBtn, currentTestimonialIndex


// --- FUNCTIONS ---

// 1. Mobile Menu Logic
const toggleMobileMenu = () => {
    mobileMenu.classList.toggle('hidden');
};


// 2. Auto Typing Effect Logic
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 70;
const erasingSpeed = 40;
const delayBeforeTyping = 1800;
const delayBeforeErasing = 1500;

function type() {
    // Check if element exists before accessing its properties
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];
    if (charIndex < currentRole.length) {
        typingTextElement.textContent += currentRole.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBeforeErasing);
    }
}

function erase() {
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];
    if (charIndex > 0) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 800);
    }
}

// 3. Testimonial Grid Rendering Logic (NEW)
function renderTestimonialsGrid() {
    if (!testimonialsGridElement) return;

    let htmlContent = '';
    testimonials.forEach(t => {
        htmlContent += `
            <div class="glass-container p-8 rounded-3xl flex flex-col justify-between hover:scale-[1.03] transition-transform duration-300">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote mb-5" style="color: var(--color-secondary);"><path d="M3 21h3c3.8-2 6-5 6-9V3H3v7c0 4-2.2 7-6 9z"/><path d="M12 21h3c3.8-2 6-5 6-9V3h-9v7c0 4-2.2 7-6 9z"/></svg>
                    <p class="text-lg italic text-white/90 mb-6">${t.quote}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-white/10">
                    <p class="font-bold text-lg" style="color: var(--color-primary);">${t.name}</p>
                    <p class="text-white/60 text-sm">${t.company}</p>
                </div>
            </div>
        `;
    });
    testimonialsGridElement.innerHTML = htmlContent;
}


// 4. Scroll and Visibility Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.id !== 'home') {
                observer.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// 5. Navbar Sticky Shrink/Glass Effect
const handleScroll = () => {
    if (nav) {
        if (window.scrollY > 80) {
            // Deeper background color when scrolled to maintain glass effect
            nav.style.backgroundColor = 'rgba(13, 0, 26, 0.9)';
            nav.classList.add('py-2');
            nav.classList.remove('p-4');
        } else {
            // Base glass-container color from CSS
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            nav.classList.remove('py-2');
            nav.classList.add('p-4');
        }
    }
};


// --- EVENT LISTENERS & INITIAL SETUP (Runs when DOM is fully loaded) ---
document.addEventListener('DOMContentLoaded', () => {

    // Set the current year in the footer
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Menu Listeners
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu); // Close menu on link click
    });

    // Start Typing Effect
    if (typingTextElement) {
        setTimeout(type, delayBeforeTyping);
    }

    // Testimonial Grid Setup (NEW)
    renderTestimonialsGrid();

    // Scroll Animations
    document.querySelectorAll('section > div').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Lucide Icon Replacement
    // The lucide library is loaded via CDN, so we ensure the function exists before calling
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});

// Navbar Scroll Listener (runs immediately)
window.addEventListener('scroll', handleScroll);