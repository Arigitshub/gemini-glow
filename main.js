// Initialize app
let apiKey = '';
let model = 'gemini-pro';

// Load settings from localStorage
function loadSettings() {
    apiKey = localStorage.getItem('gemini-api-key') || '';
    model = localStorage.getItem('gemini-model') || 'gemini-pro';
    updateConnectionStatus();
}

// Update connection status indicator
function updateConnectionStatus() {
    const indicator = document.getElementById('statusIndicator');
    const statusText = indicator.querySelector('.status-text');
    const statusDot = indicator.querySelector('.status-dot');
    
    if (apiKey) {
        statusText.textContent = 'Connected';
        statusDot.style.background = '#4caf50';
    } else {
        statusText.textContent = 'No API Key';
        statusDot.style.background = '#ff9800';
    }
}

// Send message to Gemini
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    if (!apiKey) {
        alert('Please configure your API key in Settings');
        return;
    }
    
    const messagesDiv = document.getElementById('messages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.textContent = 'You: ' + message;
    userMsg.style.marginBottom = '10px';
    userMsg.style.padding = '10px';
    userMsg.style.background = '#e3f2fd';
    userMsg.style.borderRadius = '8px';
    messagesDiv.appendChild(userMsg);
    
    userInput.value = '';
    
    // Add loading indicator
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = 'Gemini is thinking...';
    loadingMsg.style.fontStyle = 'italic';
    loadingMsg.style.color = '#666';
    messagesDiv.appendChild(loadingMsg);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
