const cursor = document.getElementById('cursor');
const folder = document.getElementById('folder');
const folderContent = document.getElementById('folderContent');
const rePoster = document.getElementById('rePoster');
const claimCard = document.getElementById('claimCard');
const claimButton = document.getElementById('claimButton');
const particles = document.getElementById('particles');

function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        particles.appendChild(particle);
    }
}

function moveCursor(x, y, duration = 1000) {
    return new Promise(resolve => {
        cursor.classList.add('active');
        cursor.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        setTimeout(resolve, duration);
    });
}

function clickAnimation() {
    return new Promise(resolve => {
        cursor.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
            setTimeout(resolve, 100);
        }, 100);
    });
}

async function startAnimation() {
    await new Promise(resolve => setTimeout(resolve, 500));

    const folderRect = folder.getBoundingClientRect();
    const folderCenterX = folderRect.left + folderRect.width / 2;
    const folderCenterY = folderRect.top + folderRect.height / 2;

    await moveCursor(folderCenterX - 15, folderCenterY - 15, 1500);

    await new Promise(resolve => setTimeout(resolve, 300));
    await clickAnimation();

    folder.style.transform = 'translate(-50%, -50%) scale(0)';
    folder.style.opacity = '0';
    folder.style.transition = 'all 0.5s ease';

    await new Promise(resolve => setTimeout(resolve, 300));

    folderContent.classList.add('active');

    await new Promise(resolve => setTimeout(resolve, 800));

    const posterRect = rePoster.getBoundingClientRect();
    const posterCenterX = posterRect.left + posterRect.width / 2;
    const posterCenterY = posterRect.top + posterRect.height / 2;

    await moveCursor(posterCenterX - 15, posterCenterY - 15, 1000);

    await new Promise(resolve => setTimeout(resolve, 300));

    rePoster.classList.add('lifting');

    await new Promise(resolve => setTimeout(resolve, 1500));

    rePoster.classList.add('glass-effect');

    await new Promise(resolve => setTimeout(resolve, 1000));
    await clickAnimation();

    folderContent.style.transition = 'all 0.5s ease';
    folderContent.style.opacity = '0';
    folderContent.style.transform = 'translate(-50%, -50%) scale(0.8)';

    await new Promise(resolve => setTimeout(resolve, 500));

    createParticles();
    claimCard.classList.add('active');

    const cardCenterX = window.innerWidth / 2;
    const cardCenterY = window.innerHeight / 2;

    await moveCursor(cardCenterX - 15, cardCenterY + 30, 800);

    cursor.style.transition = 'opacity 0.5s ease';
    cursor.style.opacity = '0';
}

claimButton.addEventListener('click', () => {
    window.open('https://linkpays.in/og6mqxm', '_blank');
});

window.addEventListener('load', () => {
    startAnimation();
});
