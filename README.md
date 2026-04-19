# WanderNepal
TeamE

## Backend Setup

1.  **Virtual Environment**: A virtual environment `venv` is created in the root directory.
2.  **Activate Virtual Environment**:
    - Windows: `.\venv\Scripts\activate`
    - Unix/macOS: `source venv/bin/activate`
3.  **Install Requirements**: `pip install -r requirements.txt`
4.  **Run Database Migrations**:
    - Navigate to the `backend/` directory.
    - `python manage.py migrate`
5.  **Start Development Server**: `python manage.py runserver`
