const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'dark';
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const backToTop = document.getElementById('back-to-top');

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const isLightTheme = theme === 'light';
    const sunIcon = themeToggle?.querySelector('.sun-icon');
    const moonIcon = themeToggle?.querySelector('.moon-icon');

    if (sunIcon) {
        sunIcon.style.display = isLightTheme ? 'none' : 'inline';
    }

    if (moonIcon) {
        moonIcon.style.display = isLightTheme ? 'inline' : 'none';
    }

    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isLightTheme ? '#f0f0f8' : '#08080f');
    }
}

function initializeThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    applyTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const nextTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

function initializeBackToTop() {
    window.addEventListener('scroll', () => {
        backToTop?.classList.toggle('visible', window.scrollY > 300);
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeMatrixRain() {
    const matrixCanvas = document.getElementById('matrix-canvas');
    const matrixContext = matrixCanvas?.getContext('2d');

    if (!matrixCanvas || !matrixContext) {
        return;
    }

    function resizeMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }

    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);

    const matrixColumns = Math.floor(matrixCanvas.width / 16);
    const matrixDrops = Array(matrixColumns).fill(1);
    const matrixCharacters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&^%$#@!'.split('');

    function drawMatrix() {
        const isLightTheme = htmlElement.getAttribute('data-theme') === 'light';
        matrixContext.fillStyle = isLightTheme ? 'rgba(240, 240, 248, 0.08)' : 'rgba(8, 8, 15, 0.05)';
        matrixContext.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixContext.fillStyle = '#a855f7';
        matrixContext.font = '14px monospace';

        for (let index = 0; index < matrixDrops.length; index += 1) {
            const character = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            matrixContext.fillText(character, index * 16, matrixDrops[index] * 16);

            if (matrixDrops[index] * 16 > matrixCanvas.height && Math.random() > 0.975) {
                matrixDrops[index] = 0;
            }

            matrixDrops[index] += 1;
        }
    }

    setInterval(drawMatrix, 50);
}

function initializePage() {
    initializeThemeToggle();
    initializeBackToTop();
    initializeMatrixRain();
}

initializePage();