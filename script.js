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

// Holo button hover 
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

// certificate 
const certificate = document.querySelector(".certificate-cont");
if (certificate) certObserver.observe(certificate);

// education boxes 
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


// contact animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const contactElements = contactForm.querySelectorAll('input, textarea, button');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactElements.forEach((el, index) => {
                    el.style.opacity = 0;
                    el.style.transform = "translateY(30px)";
                    setTimeout(() => {
                        el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
                        el.style.opacity = 1;
                        el.style.transform = "translateY(0)";
                    }, index * 100);
                });
            } else {
                contactElements.forEach(el => {
                    el.style.opacity = 0;
                    el.style.transform = "translateY(30px)";
                });
            }
        });
    }, { threshold: 0.2 });

    contactObserver.observe(contactForm);
}

// contact
const contactMessage = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const inputWrappers = document.querySelectorAll('.input-wrapper');

const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

contactMessage.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    inputWrappers.forEach(w => {
        w.querySelector('.input-tooltip').classList.remove('show');
    });

    inputWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('input, textarea');
        const tooltip = wrapper.querySelector('.input-tooltip');

        if (!input.value.trim()) {
            tooltip.textContent = "Please fill out this field";
            tooltip.classList.add('show');
            valid = false;
            return;
        }

        // Email domain validation
        if (input.type === "email") {
            const email = input.value.trim().toLowerCase();
            const domain = email.split("@")[1];

            if (!domain || !allowedDomains.includes(domain)) {
                tooltip.textContent = "This should be an Email";
                tooltip.classList.add('show');
                valid = false;
            }
        }
    });

    if (!valid) return;

    try {
        const response = await fetch(contactMessage.action, {
            method: 'POST',
            body: new FormData(contactMessage),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const fullName = contactMessage.querySelector('#name').value.trim() || "there";
            const firstName = fullName.split(" ")[0]; // Take the first word as first name
            contactMessage.reset();
            showFormMessage(
                `Hi ${firstName}, thank you for reaching out! I’ve received your message and will respond shortly.`,
                "success"
            );
        } else {
            showFormMessage("Server error. Please try again later.", "error");
        }
    } catch {
        showFormMessage("Network error. Please try again.", "error");
    }
})


function showFormMessage(message, type = "success") {
    formMessage.textContent = message;
    formMessage.className = `form-message show ${type}`;

    setTimeout(() => {
        formMessage.classList.remove("show");
    }, 3500);
}



// Animate form fields with bounce effect
function animateInputs() {
    inputs.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
            el.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, index * 100);
    });
}


//

const inputWrappers2 = document.querySelectorAll('.input-wrapper');

contactMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    inputWrappers2.forEach(wrapper => {
        const input = wrapper.querySelector('input, textarea');
        const tooltip = wrapper.querySelector('.input-tooltip');
        if (!input.value.trim()) {
            tooltip.classList.add('show');
            valid = false;

            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 3000);
        }
    });

    if (!valid) return;

});

document.querySelectorAll('.contact-socials .holo-btn').forEach(btn => {
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

// Animate social icons
const socialSection = document.querySelector('.contact-socials');

if (socialSection) {
    const socialObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                socialSection.classList.add('show');
                socialObserver.unobserve(socialSection); // animate once
            }
        });
    }, { threshold: 0.2 });

    socialObserver.observe(socialSection);
}

// Disable on touch devices
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.contact-socials .holo-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}


