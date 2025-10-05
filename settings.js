// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
});

// Load saved settings from localStorage
function loadSettings() {
    const apiKey = localStorage.getItem('gemini-api-key') || '';
    const model = localStorage.getItem('gemini-model') || 'gemini-pro';
    const theme = localStorage.getItem('gemini-theme') || 'dark';
    
    document.getElementById('apiKey').value = apiKey;
    document.getElementById('model').value = model;
    document.getElementById('theme').value = theme;
    
    applyTheme(theme);
}

// Apply theme to the page
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Setup event listeners
function setupEventListeners() {
    const saveBtn = document.getElementById('saveBtn');
    const themeSelect = document.getElementById('theme');
    
    saveBtn.addEventListener('click', saveSettings);
    
    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
}

// Save settings to localStorage
function saveSettings() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const model = document.getElementById('model').value;
    const theme = document.getElementById('theme').value;
    
    if (!apiKey) {
        alert('Please enter a valid API key');
        return;
    }
    
    localStorage.setItem('gemini-api-key', apiKey);
    localStorage.setItem('gemini-model', model);
    localStorage.setItem('gemini-theme', theme);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '✓ Settings saved successfully!';
    successMsg.style.position = 'fixed';
    successMsg.style.top = '20px';
    successMsg.style.right = '20px';
    successMsg.style.background = '#4caf50';
    successMsg.style.color = 'white';
    successMsg.style.padding = '15px 25px';
    successMsg.style.borderRadius = '8px';
    successMsg.style.fontWeight = 'bold';
    successMsg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    successMsg.style.zIndex = '1000';
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}
