window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100); // slight delay for smoother rendering
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

// Sections animation
const animatedSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            if (entry.isIntersecting) {
                if (target.classList.contains('sec2')) {
                    document.body.classList.add('swap'); // only swap for sec2
                }
                target.classList.add('animate1');
            } else {
                if (target.classList.contains('sec2')) {
                    document.body.classList.remove('swap');
                }
                target.classList.remove('animate1');
            }
        });
    },
    { threshold: 0.4 }
);
animatedSections.forEach(section => sectionObserver.observe(section));

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

// Active nav link highlighting
const sectionNavObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
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
animatedSections.forEach(section => sectionNavObserver.observe(section));

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

// Wrap letters in spans
hobbiesText.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    span.style.transition = `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`;
    hobbiesElement.appendChild(span);
});

// hobbies --
const certTextElement = document.getElementById("cert-text");
const certText = certTextElement.textContent;
certTextElement.textContent = "";

// Wrap letters in spans
const spans = certText.split("").map((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    span.style.transition = `transform 0.5s ease ${index * 0.05}s, opacity 0.5s ease ${index * 0.05}s`;
    certTextElement.appendChild(span);
    return span;
});

// Animate with IntersectionObserver
const certObserver3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            spans.forEach(span => {
                span.style.opacity = 1;
                span.style.transform = "translateX(0)";
            });
        } else {
            // Reset when scrolling out
            spans.forEach((span, index) => {
                span.style.opacity = 0;
                span.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
            });
        }
    });
}, { threshold: 0.2 });

certObserver3.observe(certTextElement);



// Boxes animation (animate individually based on visibility)
const elements = document.querySelectorAll(".box, .box1, .box2, .games, .explore, .cards, .imagine");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            // Optional: remove animation when scrolling out
            entry.target.classList.remove('animate');
        }
    });
}, { threshold: 0.1 });

// Observe all elements
elements.forEach(el => observer.observe(el));

// Hobbies letters animation
const hobbiesObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
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
        });
    },
    { threshold: 0.1 }
);
hobbiesObserver.observe(hobbiesElement);

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


const certObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    },
    { threshold: 0.2 }
);

// Observe certificate (left)
const certificate = document.querySelector(".certificate-cont");
if (certificate) certObserver.observe(certificate);

// Observe education boxes (right)
document.querySelectorAll(".education-cont").forEach(el => {
    certObserver.observe(el);
});

const cert = document.querySelector('.certificate-cont img'); // select only the image

cert.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.cursor = 'zoom-out';

    const imgClone = cert.cloneNode(true);
    imgClone.style.transform = 'scale(0.5)';
    imgClone.style.transition = 'transform 0.4s ease';
    imgClone.style.maxWidth = '90%';
    imgClone.style.maxHeight = '90%';
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    setTimeout(() => {
        imgClone.style.transform = 'scale(1)';
    }, 10);

    overlay.addEventListener('click', () => {
        imgClone.style.transform = 'scale(0.5)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 400);
    });
});


