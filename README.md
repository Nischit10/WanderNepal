# WanderNepal

WanderNepal is a comprehensive travel and tourism platform designed to showcase the beauty of Nepal. Built with a robust Django backend and a RESTful API, it allows users to discover destinations, manage bookings, and navigate through the diverse landscapes of Nepal.

---

## 🚀 Features

- **User Authentication:** Secure Sign Up and Sign In using Token Authentication.
- **Destination Discovery:** Browse and search for destinations by category, city, or name.
- **Booking Management:** Create, view, and cancel bookings for various destinations.
- **Navigation Services:** Get route information and travel details for destinations.
- **Admin Dashboard:** Manage users, destinations, and bookings through a powerful admin interface.
- **API First:** Fully documented REST API with Postman collection support.

---

## 🛠️ Tech Stack

- **Backend:** [Django](https://www.djangoproject.com/) & [Django REST Framework](https://www.django-rest-framework.org/)
- **Database:** [MySQL](https://www.mysql.com/)
- **Authentication:** Token-based Authentication
- **Environment Management:** Python Virtual Environments

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.10+**
- **MySQL Server** (ensure it's running)
- **pip** (Python package manager)

---

## 💻 Local Setup Instructions

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd WanderNepal
```

### 2. Configure Virtual Environment
Create and activate a Python virtual environment to keep dependencies isolated.

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

### 3. Install Dependencies
Install the required Python packages:
```bash
pip install -r requirements/local.txt
```

> **Note:** If you are on Linux, you might need to install MySQL development headers:
> `sudo apt-get install python3-dev default-libmysqlclient-dev build-essential`

### 4. Database Setup
1.  Open your MySQL terminal or GUI (like MySQL Workbench).
2.  Create the database:
    ```sql
    CREATE DATABASE nepal_sanctuary;
    ```
3.  **Configure Credentials:** The project uses default credentials in `backend/core/settings/local.py`. Update them if your MySQL setup is different:
    - **DB Name:** `nepal_sanctuary`
    - **User:** `root`
    - **Password:** `8778`
    - **Host:** `localhost`
    - **Port:** `3306`

### 5. Run Database Migrations
Navigate to the backend directory and apply the migrations:
```bash
cd backend
python manage.py migrate
```

### 6. Seed Initial Data
Populate the database with a set of beautiful Nepalese destinations:
```bash
python manage.py seed_destinations
```

### 7. Create Admin User
To access the Django Admin Panel, create a superuser account:
```bash
python manage.py createsuperuser
```
Follow the prompts to set your email (which serves as the username) and password.

---

## 🏃 Running the Application

Start the development server:
```bash
python manage.py runserver
```

The application will be accessible at:
- **API Base URL:** [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
- **Admin Panel:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 🧪 Testing

Run the automated test suite to ensure everything is working correctly:
```bash
python manage.py test
```

---

## 📖 API Documentation

The project includes a Postman collection for easy API testing. You can find it in the `docs/` folder:
`docs/WanderNepal_API.postman_collection.json`

For a detailed guide on API endpoints, refer to [docs/GUIDE.md](docs/GUIDE.md).

---

## 📁 Project Structure

- `backend/api/`: Core logic including models, views, and serializers.
- `backend/core/`: Project configuration and settings (base vs local).
- `docs/`: API documentation and Postman collections.
- `requirements/`: Project dependency files.

---
*Created by TeamE - 2026*
