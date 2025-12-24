window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// Typewriter effect
const typewriterElement = document.getElementById("typewriter");
const phrasesList = ["Machine Learning", "Blender 3D Models"];
const typingSpeed = 70;
const pauseTime = 1000;

let currentPhraseIndex = 0;
let currentLetterIndex = 0;

function type() {
    if (currentLetterIndex < phrasesList[currentPhraseIndex].length) {
        typewriterElement.textContent += phrasesList[currentPhraseIndex][currentLetterIndex];
        currentLetterIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, pauseTime);
    }
}

function erase() {
    if (currentLetterIndex > 0) {
        typewriterElement.textContent = phrasesList[currentPhraseIndex].slice(0, currentLetterIndex - 1);
        currentLetterIndex--;
        setTimeout(erase, typingSpeed);
    } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrasesList.length;
        setTimeout(type, typingSpeed);
    }
}

type();

// Navigation smooth scroll
const navLinks = document.querySelectorAll('.header .nav-links a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Responsive CSS switch
function handleScreenResize() {
    if (window.innerWidth <= 768) {
        document.getElementById('desktop-css').disabled = true;
        document.getElementById('mobile-css').disabled = false;
    } else {
        document.getElementById('desktop-css').disabled = false;
        document.getElementById('mobile-css').disabled = true;
    }
}
window.addEventListener('resize', handleScreenResize);
window.addEventListener('load', handleScreenResize);

// Hobbies text animation
const hobbiesElement = document.getElementById("hobbies-text");
const hobbiesText = hobbiesElement.textContent;
hobbiesElement.textContent = "";

hobbiesText.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    span.style.transition = `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`;
    hobbiesElement.appendChild(span);
});

// Boxes
const boxes = document.querySelectorAll(".box, .box1, .box2");

// Sections
const animatedSections = document.querySelectorAll('.sec1, .sec2, .sec3');

// Unified Intersection Observer
const unifiedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        // Section animation + body swap
        if (target.classList.contains('sec1') || target.classList.contains('sec2') || target.classList.contains('sec3')) {
            const isSec3 = target.classList.contains('sec3');
            if (entry.isIntersecting) {
                target.classList.add('animate');
                if (!isSec3) document.body.classList.add('swap');

                // Active nav link
                const id = target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            } else {
                target.classList.remove('animate');
                if (!isSec3) document.body.classList.remove('swap');
            }
        }

        // Hobbies animation
        if (target === hobbiesElement) {
            const spans = hobbiesElement.querySelectorAll("span");
            if (entry.isIntersecting) {
                hobbiesElement.classList.add('animate');
                spans.forEach(span => {
                    span.style.opacity = 1;
                    span.style.transform = "translateX(0)";
                });
            } else {
                hobbiesElement.classList.remove('animate');
                spans.forEach((span, index) => {
                    span.style.opacity = 0;
                    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
                });
            }
        }

        // Boxes animation
        if (target.classList.contains('box') || target.classList.contains('box1') || target.classList.contains('box2')) {
            target.classList.toggle('animate', entry.isIntersecting);
        }
    });
}, { threshold: 0.1 });

// Observe all targets
animatedSections.forEach(section => unifiedObserver.observe(section));
boxes.forEach(box => unifiedObserver.observe(box));
unifiedObserver.observe(hobbiesElement);

// Holo button hover effect
document.querySelectorAll('.holo-btn').forEach(btn => {
    const img = btn.querySelector('img');

    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        img.style.setProperty('--x', `${x * 100}%`);
        img.style.setProperty('--y', `${y * 100}%`);
        img.style.setProperty('--rx', `${(0.5 - y) * 14}deg`);
        img.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
    });

    btn.addEventListener('mouseleave', () => {
        img.style.setProperty('--x', `50%`);
        img.style.setProperty('--y', `50%`);
        img.style.setProperty('--rx', `0deg`);
        img.style.setProperty('--ry', `0deg`);
    });
});
