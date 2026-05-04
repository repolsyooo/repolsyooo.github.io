/* ============================================
   1. TYPEWRITER ANIMATION
   ============================================ */
const text = "Welcome to my digital archive :> a space where I've gathered the threads of my past, from the defining milestones to the quiet moments in between.";
let i = 0;

function typeWriter() {
    const target = document.getElementById("typewriter");
    if (target && i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 38);
    }
}

/* ============================================
   2. DRAGGABLE ID CARD
   ============================================ */
const card = document.getElementById('vibeCard');
let isDragging = false;
let startX = 0, startY = 0, origX = 0, origY = 0;

if (card) {
    card.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - origX;
        startY = e.clientY - origY;
        card.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        origX = e.clientX - startX;
        origY = e.clientY - startY;
        card.style.transform = `translate(${origX}px, ${origY}px) rotate(${origX * 0.04}deg)`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        origX = 0;
        origY = 0;
        card.style.transform = '';
    });
}

/* ============================================
   3. SOCIAL OVERLAY
   ============================================ */
function openSocial() {
    const overlay = document.getElementById('socialOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSocial() {
    const overlay = document.getElementById('socialOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('socialToggleBtn').addEventListener('click', openSocial);
document.getElementById('heroSocialBtn').addEventListener('click', openSocial);
document.getElementById('closeOverlay').addEventListener('click', closeSocial);

document.getElementById('socialOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('socialOverlay')) closeSocial();
});

/* ============================================
   4. SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   5. ACTIVE NAV LINK ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('main[id], section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ============================================
   6. INITIALISE
   ============================================ */
window.addEventListener('load', () => {
    typeWriter();
});
