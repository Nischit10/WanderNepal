# WanderNepal - Collaborative Travel Platform

WanderNepal is a full-stack travel booking application featuring a React frontend and a Django REST Framework backend.

## Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Git**

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Nischit10/WanderNepal.git
cd WanderNepal
```

### 2. Backend Configuration

Navigate to the project root:

1.  **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    ```
2.  **Activate Virtual Environment**:
    - **Windows**: `.\venv\Scripts\activate`
    - **Unix/macOS**: `source venv/bin/activate`
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements/local.txt
    ```
    *(Note: If `requirements/local.txt` is missing, use `pip install -r backend/requirements.txt`)*
4.  **Database Setup**:
    ```bash
    cd backend
    python manage.py migrate
    ```
5.  **Seed Data (Optional)**:
    ```bash
    python manage.py seed_destinations
    python manage.py seed_navigation
    ```

### 3. Frontend Configuration

Navigate to the `frontend` directory:

1.  **Install Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```
2.  **Environment Variables**:
    Ensure `.env` is configured correctly. The default configuration usually points to `http://127.0.0.1:8000/api`.

---

## Running the Application

### Option A: Concurrent Run (Recommended)
From the **root directory**, run:
```bash
npm install concurrently kill-port --save-dev  # If not already installed
npm run dev
```
This will start both the Django server (port 8000) and the React development server (port 3000) simultaneously.

### Option B: Manual Run
- **Backend**: `cd backend && python manage.py runserver`
- **Frontend**: `cd frontend && npm start`

---

## Project Structure
- `backend/`: Django REST Framework project.
- `frontend/`: React application.
- `docs/`: API documentation and Postman collections.
- `requirements/`: Python dependency files.
