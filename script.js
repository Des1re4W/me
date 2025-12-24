window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

const phrases = ["Machine Learning", "Blender 3D Models"];
const typewriter = document.getElementById("typewriter");
const typingSpeed = 70;
const pauseTime = 1000;

let phraseIndex = 0;
let letterIndex = 0;

function type() {
    if (letterIndex < phrases[phraseIndex].length) {
        typewriter.textContent += phrases[phraseIndex][letterIndex];
        letterIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, pauseTime);
    }
}

function erase() {
    if (letterIndex > 0) {
        typewriter.textContent = phrases[phraseIndex].slice(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, typingSpeed);
    } else {
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
            const isSec3 = entry.target.classList.contains('sec3');

            if (entry.isIntersecting) {
                if (!isSec3) document.body.classList.add('swap');
                entry.target.classList.add('animate');
            } else {
                if (!isSec3) document.body.classList.remove('swap');
                entry.target.classList.remove('animate'); 
                entry.target.classList.remove('animate');

            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));


const navLinks = document.querySelectorAll('.header .nav-links a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

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
h1.textContent = ""; 

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

// hobbies
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box, .box1, .box2");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
                else {
                    entry.target.classList.remove("animate");
                }
            });
        },
        { threshold: 0.3 }
    );

    boxes.forEach(box => observer.observe(box));
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
    { threshold: 0.4 } 
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
    { threshold: 0.4 }
);

sections1.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.holo-btn').forEach(btn => {
    const img = btn.querySelector('img');

    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

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

