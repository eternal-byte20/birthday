 // Reasons database
 // Reasons database
const reasons = [
    {
        text: "Thank you so much for replying to me on such a random day, I really can't forget the day we started talking 🫠",
        image: "images and videos/5FE6E537-D2E4-40F5-93C8-CA10233BBF4E.JPG",
        gif: "gif1.gif"
    },
    {
        text: "You are the person who came into my life and healed me with lots of laughter ❤️‍🩹",
        image: "images and videos/Screenshot 2026-09-16 at 23.42.17.png",
        gif: "gif2.gif"
    },
    {
        text: "I wish our bond continues like this forever, and we will create lots of memories throughout our journey ✨",
        image: "images and videos/IMG_6209.PNG",
        gif: "gif1.gif"
    },
    {
        text: "You are the amazing, cutest girl who came into my life and brought happiness for me 🥳",
        image: "images and videos/Screenshot 2026-09-14 at 11.09.10.png",
        gif: "gif2.gif"
    },
    {
        text: "You are the amazing, cutest girl who came into my life and brought happiness for me 🥳",
        image: "images and videos/Screenshot 2026-09-16 at 23.42.49.png",
        gif: "gif1.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
// Create reason card with favorite image + GIF
function createReasonCard(reason) {

    const card = document.createElement('div');
    card.className = 'reason-card';

    // Favorite image
    const favoriteImage = document.createElement('img');

    favoriteImage.className = 'reason-favorite-image';
    favoriteImage.src = reason.image;
    favoriteImage.alt = "Favorite Memory";

    // Reason text
    const text = document.createElement('div');
    text.className = 'reason-text';

    text.textContent = reason.text;

    // GIF overlay
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';

    gifOverlay.innerHTML = `
        <img 
            src="${reason.gif}" 
            alt="Friendship Memory"
        >
    `;

    // Add everything to card
    card.appendChild(favoriteImage);
    card.appendChild(text);
    card.appendChild(gifOverlay);

    // Card animation
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        //reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Chalooo 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);

// Background video playback support
const backgroundVideo = document.getElementById('background-video');

if (backgroundVideo) {
    backgroundVideo.muted = true;

    const startBackgroundVideo = () => {
        backgroundVideo.play().catch(() => {
            // Autoplay can be blocked by some browsers; the video remains available.
        });
    };

    window.addEventListener('load', startBackgroundVideo);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            backgroundVideo.pause();
        } else {
            startBackgroundVideo();
        }
    });
}
