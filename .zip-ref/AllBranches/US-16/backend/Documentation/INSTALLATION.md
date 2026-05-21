# Installation Guide - WanderNepal

This guide will help you set up and run the WanderNepal project on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)
- Git (optional, for cloning)

---

## 1. Setup the Repository

Clone the project repository or download the source code:
```bash
git clone <repository_url>
cd WanderNepal
```

---

## 2. Configure Virtual Environment

Create and activate a Python virtual environment to manage dependencies:

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

Install the required Python packages:
```bash
pip install -r requirements/local.txt
```

> **Note:** On Linux, you might need to install MySQL development headers before running the above command:
> `sudo apt-get install python3-dev default-libmysqlclient-dev build-essential` (Ubuntu/Debian)

---

## 4. Database Setup

1.  Open your MySQL terminal or a GUI like MySQL Workbench.
2.  Create a new database:
    ```sql
    CREATE DATABASE nepal_sanctuary;
    ```
3.  The project is configured to connect to MySQL with the following default settings in `backend/core/settings/local.py`:
    - **NAME**: `nepal_sanctuary`
    - **USER**: `root`
    - **PASSWORD**: `8778`
    - **HOST**: `localhost`
    - **PORT**: `3306`

    *If your MySQL configuration is different, update these values in `backend/core/settings/local.py`.*

---

## 5. Run Migrations

Navigate to the `backend/` directory and apply the database migrations:
```bash
cd backend
python manage.py migrate
```

---

## 6. Create an Admin User (Optional)

To access the Django Admin panel, create a superuser:
```bash
python manage.py createsuperuser
```
Follow the prompts to set your username (e.g., `admin@example.com`) and password.

---

## 7. Run the Development Server

Start the Django development server:
```bash
python manage.py runserver
```

The application will be available at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

- **Admin Panel**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **API Endpoints**: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
