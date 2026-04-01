# Nepal Sanctuary - Backend API

This is the Django REST Framework (DRF) backend for the Nepal Sanctuary project. This document provides setup instructions for front-end developers and testing guidelines for QA.

## Base URL
Local Development: `http://127.0.0.1:8000/`

---

## API Documentation

### 1. User Registration (Sign Up)
Creates a new user account using an email address.

* **URL:** `/api/signup/`
* **Method:** `POST`
* **Headers:** 
  * `Content-Type: application/json`
* **Authentication / API Key Required:** `False` (Public endpoint)

#### Request Body (JSON)
```json
{
    "full_name": "John Doe",
    "email": "johndoe@example.com",
    "password": "SecurePassword123!",
    "confirm_password": "SecurePassword123!"
}