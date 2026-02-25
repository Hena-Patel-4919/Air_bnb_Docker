# AirHome - Dockerized Multi-Module Application

## Project Structure
```
airhome-docker/
├── backend/           # Flask API service
├── ml_module/         # Machine Learning service
├── frontend/          # User-facing web interface
├── ui/                # Admin dashboard
└── docker-compose.yml # Docker orchestration
```

## Services

- **Backend API** (Port 5001): REST API for property data
- **ML Module** (Port 5002): Machine learning predictions
- **Frontend** (Port 8080): Public web interface
- **UI Dashboard** (Port 8081): Admin dashboard

## Quick Start

### Build and Run
```bash
docker-compose up --build
```

### Access Services
- Frontend: http://localhost:8080
- Admin UI: http://localhost:8081
- Backend API: http://localhost:5001
- ML Module: http://localhost:5002

### Stop Services
```bash
docker-compose down
```

## API Endpoints

### Backend
- GET /api/health - Health check
- GET /api/properties - List properties
- POST /api/predict - Get price prediction

### ML Module
- GET /ml/health - Health check
- POST /ml/predict - ML prediction
- POST /ml/train - Train model