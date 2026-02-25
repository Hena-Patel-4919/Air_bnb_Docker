from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "backend"})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    # Forward to ML module
    ml_response = requests.post('http://ml_module:5002/ml/predict', json=data)
    return jsonify(ml_response.json())

@app.route('/api/properties', methods=['GET'])
def get_properties():
    return jsonify({
        "properties": [
            {"id": 1, "city": "Mumbai", "price": 5000000, "area": 1200},
            {"id": 2, "city": "Delhi", "price": 4500000, "area": 1000},
            {"id": 3, "city": "Bangalore", "price": 6000000, "area": 1500}
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)