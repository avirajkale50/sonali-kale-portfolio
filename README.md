# Physics Teacher Portfolio Website

A full-stack portfolio website for a physics teacher featuring public pages for showcasing profile, education, publications, research projects, and educational materials, along with a secure admin panel for content management.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- TanStack Query (data fetching)
- React Router (routing)
- Axios (HTTP client)

### Backend
- Python FastAPI
- MongoDB (database)
- Motor (async MongoDB driver)
- JWT authentication
- Pydantic (validation)

## Project Structure

```
physics-teacher-portfolio/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── config/         # Configuration
│   │   ├── models/         # Pydantic models
│   │   ├── routes/         # API endpoints
│   │   └── utils/          # Utilities
│   ├── main.py             # FastAPI app
│   └── requirements.txt    # Python dependencies
│
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   └── utils/             # Utilities
│
└── README.md              # This file
```

## Features

### Public Pages
- **Homepage**: Teacher profile with photo and introduction
- **Education**: Academic background and qualifications
- **Publications**: Research publications with abstracts and PDFs
- **Projects**: Research projects and collaborations
- **Educational Materials**: Downloadable resources organized by tabs/categories

### Admin Panel
- Secure login with JWT authentication
- Full CRUD operations for all content sections
- File upload for photos, PDFs, and educational materials
- Real-time updates reflected on public pages

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and other settings
```

5. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
```

3. Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Development

### Running Both Servers

Terminal 1 (Backend):
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Building for Production

Frontend:
```bash
npm run build
```

The build output will be in the `dist/` directory.

## Environment Variables

### Backend (.env)
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=physics_portfolio
SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
```

## License

This project is created as a freelance project for a physics teacher at the university.
# sonali-kale-portfolio
