// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "I am very lucky and glad to have you in my life DARLA 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
// Favorite images that will float around the page
const floatingImages = [
    "images and videos/37A13C92-6796-4EB2-8DD2-187703074A91.JPG",
    "images and videos/50A7A278-59DE-4D83-BA4A-9188A582B67F.JPG",
    "images and videos/Screenshot 2026-09-16 at 23.42.17.png"
];

function createFloating() {
    const element = document.createElement('img');

    element.className = 'floating-image';

    // Pick a random image
    element.src = floatingImages[
        Math.floor(Math.random() * floatingImages.length)
    ];

    // Random starting position
    element.style.left = Math.random() * 90 + 'vw';
    element.style.top = (Math.random() * 80 + 20) + 'vh';

    // Random size
    const size = Math.random() * 40 + 70;
    element.style.width = size + 'px';
    element.style.height = size + 'px';

    document.body.appendChild(element);

    gsap.fromTo(element,
        {
            opacity: 0,
            scale: 0.5
        },
        {
            opacity: 0.85,
            scale: 1,
            duration: 1
        }
    );

    gsap.to(element, {
        y: -window.innerHeight - 200,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 60 - 30,
        duration: Math.random() * 6 + 8,
        ease: "none",

        onComplete: () => {
            element.remove();
        }
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html'; // Replace with the actual URL of the next page
                }
            });
        });
    });