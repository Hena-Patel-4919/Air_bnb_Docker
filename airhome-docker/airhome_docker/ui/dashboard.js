const BACKEND_URL = 'http://localhost:5001';
const ML_URL = 'http://localhost:5002';

async function checkServiceHealth(url, elementId) {
    const statusElement = document.getElementById(elementId);
    try {
        const response = await fetch(`${url}/health`, { mode: 'cors' });
        if (response.ok) {
            statusElement.textContent = '✓ Healthy';
            statusElement.className = 'status healthy';
        } else {
            throw new Error('Service unhealthy');
        }
    } catch (error) {
        statusElement.textContent = '✗ Offline';
        statusElement.className = 'status error';
    }
}

async function loadDashboardData() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/properties`);
        const data = await response.json();
        document.getElementById('totalProperties').textContent = data.properties.length;
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

// Check services on load
document.addEventListener('DOMContentLoaded', () => {
    checkServiceHealth(BACKEND_URL + '/api', 'backend-status');
    checkServiceHealth(ML_URL + '/ml', 'ml-status');
    loadDashboardData();
    
    // Refresh health status every 30 seconds
    setInterval(() => {
        checkServiceHealth(BACKEND_URL + '/api', 'backend-status');
        checkServiceHealth(ML_URL + '/ml', 'ml-status');
    }, 30000);
});