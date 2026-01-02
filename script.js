document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    if (!isMobile) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    if (!isMobile) {
        const magneticElements = document.querySelectorAll('.btn, .socials a, .footer-socials a, #theme-btn');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const pull = el.classList.contains('btn') ? 0.2 : 0.4;

                el.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transition = 'transform 0.3s ease';
                el.style.transform = `translate(0, 0)`;

                el.addEventListener('transitionend', function handler() {
                    el.style.transition = '';
                    el.removeEventListener('transitionend', handler);
                });
            });
        });

    }

    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    const mTitle = document.getElementById('m-title');
    const mStack = document.getElementById('m-stack');
    const mDesc = document.getElementById('m-desc');
    const mLiveDemo = document.getElementById('m-live-demo');
    const mCode = document.getElementById('m-code');


    const projectData = {
        'p1': {
            title: 'Clothing Store',
            stack: 'React • Next.js • Tailwind CSS • Firebase • ShadCN UI',
            desc: 'A performant, server-rendered e-commerce platform built on a modern tech stack: Next.js for the frontend, Firebase (Firestore and Auth) for the backend, and styled with Tailwind CSS.',
            liveUrl: 'https://clothing-store-xq4v.onrender.com/',
            codeUrl: 'https://github.com/bbhatt-git/clothing-store'
        },
        'p2': {
            title: 'Academic Club Dashboard',
            stack: 'React • Next.js • Tailwind CSS • Firebase',
            desc: 'A web application for managing academic clubs, featuring event scheduling, member management, and resource sharing with a user-friendly interface. Built with React and Next.js for optimal performance.',
            liveUrl: 'https://sarc-club.vercel.app/',
            codeUrl: 'https://github.com/bbhatt-git/studio/'
        },
        'p3': {
            title: 'QR Attendance System',
            stack: 'React • Next.js • Tailwind CSS • GenkitAI API • Firebase',
            desc: 'A web application for managing student attendance. The app uses QR to identify a student with thier uniquely generated Student ID, and features other essential options like admin logins, student data feeding, csv exports, qr generation, and much more.',
            liveUrl: 'https://qwickattend.vercel.app',
            codeUrl: 'https://github.com/bbhatt-git/qwickattend/'
        },
        'p4': {
            title: 'Social Connect',
            stack: 'MERN Stack • Socket.io',
            desc: 'A real-time social media application featuring live chat, post sharing, likes, comments, and user authentication.'
        },
        'p5': {
            title: 'Brand Identity Design',
            stack: 'Adobe Illustrator • Photoshop',
            desc: 'Complete brand overhaul for a local restaurant, including logo design, menu layout, and social media marketing assets.'
        },
        'p6': {
            title: 'Technical Tech Blog',
            stack: 'Next.js • Sanity CMS',
            desc: 'A high-performance blog optimized for SEO, featuring markdown support, dark mode, and newsletter subscription.'
        }
    };

    window.openModal = function (id) {
        if (projectData[id]) {
            const project = projectData[id];

            mTitle.innerText = project.title;
            mStack.innerText = project.stack;
            mDesc.innerText = project.desc;

            
            if (mLiveDemo) mLiveDemo.href = project.liveUrl || '#';
            if (mCode) mCode.href = project.codeUrl || '#';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyba49ZLsyk5C2e8zKBevq3k_DbCBPUK_ebgbHEQIy_l2TG_rFVqniBB9TQ4aebxnw5/exec'
    const form = document.forms['contact-form']

    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
    })

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            const data = new FormData(e.target);

            btn.disabled = true;
            btn.innerText = 'Sending...';
            btn.style.background = '#3b82f6';

            fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerText = 'Sent!';
                        btn.style.background = '#22c55e';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    btn.innerText = 'Failed!';
                    btn.style.background = '#ef4444';
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .finally(() => {
                    if (btn.innerText === 'Sent!') {
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.background = '';
                            btn.disabled = false;
                        }, 3000);
                    }
                });
        });
    }

    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});