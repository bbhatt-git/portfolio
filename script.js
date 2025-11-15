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
// Elements are guaranteed to exist since the script is loaded just before </body>
const slider = document.getElementById('testimonial-slider');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const typingTextElement = document.getElementById('typing-text');
const currentYearEl = document.getElementById('current-year');
const nav = document.getElementById('navbar');

let currentTestimonialIndex = 0;


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


// 3. Testimonial Revolving Logic
function changeTestimonial(direction) {
    if (!slider) return;

    const card = slider.querySelector('.testimonial-card');
    const transitionDuration = 500; // ms

    if (card) {
        // Slide Out transition
        card.style.transition = `transform ${transitionDuration / 1000}s cubic-bezier(0.4, 0, 0.6, 1), opacity ${transitionDuration / 1000}s ease-in`;
        card.style.transform = `translateY(${direction > 0 ? '-70px' : '70px'})`;
        card.style.opacity = '0';
    }

    currentTestimonialIndex = (currentTestimonialIndex + direction + testimonials.length) % testimonials.length;

    // Wait for slide out, then update content and slide in
    setTimeout(() => {
        const t = testimonials[currentTestimonialIndex];

        // Content update (start off-screen)
        const startY = direction > 0 ? '70px' : '-70px';
        slider.innerHTML = `
            <div class="testimonial-card glass-container p-10 rounded-3xl text-center max-w-2xl w-full"
                 style="opacity: 0; transform: translateY(${startY});">

                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote mx-auto mb-5" style="color: var(--color-secondary);"><path d="M3 21h3c3.8-2 6-5 6-9V3H3v7c0 4-2.2 7-6 9z"/><path d="M12 21h3c3.8-2 6-5 6-9V3h-9v7c0 4-2.2 7-6 9z"/></svg>

                <p class="text-xl sm:text-2xl italic text-white mb-6">${t.quote}</p>
                <p class="font-bold text-lg" style="color: var(--color-primary);">${t.name}</p>
                <p class="text-white/60 text-sm">${t.company}</p>
            </div>
        `;

        // Trigger slide in
        setTimeout(() => {
            const newCard = slider.querySelector('.testimonial-card');
            newCard.style.transition = `transform ${transitionDuration / 1000}s cubic-bezier(0.23, 1, 0.32, 1), opacity ${transitionDuration / 1000}s cubic-bezier(0.23, 1, 0.32, 1)`;
            newCard.style.transform = 'translateY(0)';
            newCard.style.opacity = '1';
        }, 10);
    }, card ? transitionDuration : 0);
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

    // Testimonial Navigation Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => changeTestimonial(1));
    if (prevBtn) prevBtn.addEventListener('click', () => changeTestimonial(-1));

    // Start Typing Effect
    if (typingTextElement) {
        setTimeout(type, delayBeforeTyping);
    }

    // Testimonial Setup
    if (slider) {
        changeTestimonial(1); // Initial testimonial load
        // Auto-revolve testimonials every 7 seconds
        setInterval(() => changeTestimonial(1), 7000);
    }

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