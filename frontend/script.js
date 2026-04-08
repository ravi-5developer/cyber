// Elements
const form = document.getElementById('predictionForm');
const urlInput = document.getElementById('urlInput');
const loadingPanel = document.getElementById('loadingPanel');
const resultPanel = document.getElementById('resultPanel');
const errorPanel = document.getElementById('errorPanel');
const welcomePanel = document.getElementById('welcomePanel');
const resultContent = document.getElementById('resultContent');
const errorMessage = document.getElementById('errorMessage');
const urlValidation = document.getElementById('urlValidation');
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
  
const API_BASE_URL = 'http://localhost:5000/api';

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon();
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// URL Input Validation
urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    if (url) {
        if (isValidURL(url)) {
            urlValidation.innerHTML = '<i class="fas fa-check-circle"></i> Valid URL';
            urlValidation.classList.add('valid');
            urlValidation.classList.remove('invalid');
        } else {
            urlValidation.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid URL';
            urlValidation.classList.add('invalid');
            urlValidation.classList.remove('valid');
        }
    } else {
        urlValidation.innerHTML = '';
        urlValidation.classList.remove('valid', 'invalid');
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();

    if (!url) {
        showError('Please enter a URL');
        return;
    }

    const urlWithProtocol = url.startsWith('http') ? url : 'https://' + url;

    if (!isValidURL(urlWithProtocol)) {
        showError('Please enter a valid URL');
        return;
    }

    await analyzeURL(urlWithProtocol);
});

// Fill example URLs
function fillExample(url) {
    urlInput.value = url;
    urlInput.dispatchEvent(new Event('input'));
}

// API Call
async function analyzeURL(url) {
    hideAll();
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            const errorData = await response.json();
            showError(errorData.message || 'Failed to analyze URL');
            return;
        }

        const data = await response.json();
        displayResult(data);

    } catch (err) {
        console.error('Error:', err);
        showError('Failed to connect to server. Make sure backend is running on http://localhost:5000');
    }
}

// Display Result
function displayResult(data) {
    hideAll();

    const isPhishing = data.prediction === 'Phishing';
    const badgeClass = isPhishing ? 'phishing' : 'legitimate';
    const icon = isPhishing ? '⚠️ Warning' : '✅ Safe';
    const confidence = data.confidence;

    let html = `
        <div class="result-badge ${badgeClass}">
            ${icon}
        </div>

        <div class="result-info">
            <div class="result-info-item">
                <span class="result-info-label">Status:</span>
                <span class="result-info-value">${data.prediction}</span>
            </div>
            <div class="result-info-item">
                <span class="result-info-label">URL:</span>
                <span class="result-info-value" style="word-break: break-all;">${data.url}</span>
            </div>
        </div>

        <div class="confidence-section">
            <div class="confidence-label">
                <span>Confidence Score</span>
                <span>${confidence}%</span>
            </div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: 0%"></div>
            </div>
        </div>
    `;

    if (data.features) {
        html += `
            <div class="features-section-result">
                <h4><i class="fas fa-chart-bar"></i> URL Analysis</h4>
                <div class="feature-list">
        `;

        for (const [key, value] of Object.entries(data.features)) {
            const displayKey = key.replace(/_/g, ' ').toUpperCase();
            html += `
                <div class="feature-item">
                    <div class="feature-item-name">${displayKey}</div>
                    <div class="feature-item-value">${value}</div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    html += `
        <div class="action-buttons">
            <button class="btn-check-another" onclick="resetForm()">
                <i class="fas fa-search"></i> Check Another
            </button>
            <button class="btn-copy" onclick="copyToClipboard('${data.url}')">
                <i class="fas fa-copy"></i> Copy URL
            </button>
        </div>
    `;

    resultContent.innerHTML = html;
    resultPanel.classList.remove('hidden');

    // Animate confidence bar
    setTimeout(() => {
        const fill = resultPanel.querySelector('.confidence-fill');
        fill.style.width = confidence + '%';
    }, 100);
}

// Show Error
function showError(message) {
    hideAll();
    errorMessage.textContent = message;
    errorPanel.classList.remove('hidden');
}

// Show Loading
function showLoading() {
    loadingPanel.classList.remove('hidden');
}

// Hide All Panels
function hideAll() {
    loadingPanel.classList.add('hidden');
    resultPanel.classList.add('hidden');
    errorPanel.classList.add('hidden');
    welcomePanel.classList.add('hidden');
}

// Reset Form
function resetForm() {
    urlInput.value = '';
    urlValidation.innerHTML = '';
    urlValidation.classList.remove('valid', 'invalid');
    hideAll();
    welcomePanel.classList.remove('hidden');
    urlInput.focus();
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.btn-copy');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}

// URL Validation
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                navLinks.classList.remove('active');
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});