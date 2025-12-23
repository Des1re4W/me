window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100); // slight delay for smoother rendering
});

const phrases = ["Machine Learning", "Blender 3D Models"];
const typewriter = document.getElementById("typewriter");
const typingSpeed = 70; // 0.5s per letter
const pauseTime = 1000;  // pause between phrases

let phraseIndex = 0;
let letterIndex = 0;

function type() {
    if (letterIndex < phrases[phraseIndex].length) {
        typewriter.textContent += phrases[phraseIndex][letterIndex];
        letterIndex++;
        setTimeout(type, typingSpeed);
    } else {
        // pause before deleting
        setTimeout(erase, pauseTime);
    }
}

function erase() {
    if (letterIndex > 0) {
        typewriter.textContent = phrases[phraseIndex].slice(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, typingSpeed);
    } else {
        // move to next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
    }
}

type(type, 2800);

// Intersection Observer for sec2 & sec3
const sections = document.querySelectorAll('.sec2, .sec3');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            // If sec3, skip adding 'swap' to body
            const isSec3 = entry.target.classList.contains('sec3');

            if (entry.isIntersecting) {
                if (!isSec3) document.body.classList.add('swap'); // swap only if not sec3
                entry.target.classList.add('animate'); // animate the section
            } else {
                if (!isSec3) document.body.classList.remove('swap'); // remove swap only if not sec3
                entry.target.classList.remove('animate'); // remove animate

            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(section => observer.observe(section));


const navLinks = document.querySelectorAll('.header .nav-links a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // prevent default jump

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// hobbies
const h1 = document.getElementById("hobbies-text");
const sec3 = document.querySelector(".sec3");
const text = h1.textContent;
h1.textContent = ""; // clear original text

// Wrap each letter in a span
text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"; // alternate left/right
    span.style.transition = `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`;
    h1.appendChild(span);
});

// Intersection Observer
const observer1 = new IntersectionObserver(
    (entries, observer1) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                h1.querySelectorAll("span").forEach(span => {
                    span.style.opacity = 1;
                    span.style.transform = "translateX(0)";
                });
            } else {
                entry.target.classList.remove('animate');
                h1.querySelectorAll("span").forEach((span, index) => {
                    span.style.opacity = 0;
                    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
                });
            }
        });
    },
    { threshold: 0.4 } // trigger when 30% of sec3 is visible
);

observer1.observe(sec3);
const sections1 = document.querySelectorAll('.sec1, .sec2, .sec3');
const navLinks1 = document.querySelectorAll('.header .nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks1.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    },
    { threshold: 0.4 } // trigger when 30% of section is visible
);

// Observe all sections

