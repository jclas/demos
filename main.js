// ----- Theme toggle -----
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

const currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const isLight = theme === 'light';
    themeToggle.querySelector('.sun-icon').style.display = isLight ? 'none' : 'inline';
    themeToggle.querySelector('.moon-icon').style.display = isLight ? 'inline' : 'none';
    metaThemeColor.setAttribute('content', isLight ? '#f0f0f8' : '#08080f');
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const next = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
});

// ----- Back to top -----
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----- Section reveal on scroll -----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ----- Matrix rain -----
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const matrixCols = Math.floor(matrixCanvas.width / 16);
const matrixDrops = Array(matrixCols).fill(1);
const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&^%$#@!'.split('');

function drawMatrix() {
    const isLightTheme = htmlElement.getAttribute('data-theme') === 'light';
    matrixCtx.fillStyle = isLightTheme ? 'rgba(240, 240, 248, 0.08)' : 'rgba(8, 8, 15, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#a855f7';
    matrixCtx.font = '14px monospace';

    for (let i = 0; i < matrixDrops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        matrixCtx.fillText(char, i * 16, matrixDrops[i] * 16);

        if (matrixDrops[i] * 16 > matrixCanvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
    }
}

setInterval(drawMatrix, 50);