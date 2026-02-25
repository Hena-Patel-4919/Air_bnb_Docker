from flask import Flask, jsonify, request
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

app = Flask(__name__)

# Simple mock model
model = RandomForestRegressor(n_estimators=10, random_state=42)

@app.route('/ml/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "ml_module"})

@app.route('/ml/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Mock prediction
    features = [
        data.get('bedrooms', 2),
        data.get('bathrooms', 2),
        data.get('area', 1000),
        data.get('location_score', 5)
    ]
    
    # Simple calculation instead of real model
    predicted_price = (features[2] * 3000) + (features[0] * 500000) + (features[1] * 300000)
    predicted_occupancy = min(85, 50 + (features[3] * 5))
    
    return jsonify({
        "predicted_price": float(predicted_price),
        "predicted_occupancy": float(predicted_occupancy),
        "roi_estimate": round((predicted_occupancy * predicted_price * 0.001) / predicted_price * 100, 2)
    })

@app.route('/ml/train', methods=['POST'])
def train():
    return jsonify({"status": "training_complete", "accuracy": 0.85})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)