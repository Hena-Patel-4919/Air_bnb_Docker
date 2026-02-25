const API_URL = 'http://localhost:5001';

// Load properties on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
});

// Handle form submission
document.getElementById('propertyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        bedrooms: parseInt(document.getElementById('bedrooms').value),
        bathrooms: parseInt(document.getElementById('bathrooms').value),
        area: parseInt(document.getElementById('area').value),
        location_score: parseInt(document.getElementById('location_score').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to get prediction. Make sure the backend is running.');
    }
});

function displayResults(data) {
    document.getElementById('results').style.display = 'grid';
    document.getElementById('predicted_price').textContent = 
        `₹${data.predicted_price.toLocaleString('en-IN')}`;
    document.getElementById('predicted_occupancy').textContent = 
        `${data.predicted_occupancy.toFixed(1)}%`;
    document.getElementById('roi_estimate').textContent = 
        `${data.roi_estimate}%`;
}

async function loadProperties() {
    try {
        const response = await fetch(`${API_URL}/api/properties`);
        const data = await response.json();
        
        const propertyList = document.getElementById('propertyList');
        propertyList.innerHTML = data.properties.map(prop => `
            <div class="property-card">
                <h3>${prop.city}</h3>
                <p><strong>Price:</strong> ₹${prop.price.toLocaleString('en-IN')}</p>
                <p><strong>Area:</strong> ${prop.area} sq ft</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}