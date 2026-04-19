# WanderNepal Backend API Documentation

This is the Django REST Framework (DRF) backend for the WanderNepal project. This document provides all the necessary information for frontend developers to integrate with the API.

---

## 🌐 Base URL
- **Local Development**: `http://127.0.0.1:8000/`

---

## 🔐 Authentication
This API uses **Token-based Authentication**. 
1. Upon a successful **Sign In**, the API returns a `token`.
2. For all subsequent requests that require authentication, include this token in the `Authorization` header:
   ```text
   Authorization: Token <your_token_here>
   ```

---

## 🚀 API Endpoints

### 1. User Registration (Sign Up)
Creates a new user account.

- **URL**: `/api/signup/`
- **Method**: `POST`
- **Payload (JSON)**:
  ```json
  {
      "full_name": "John Doe",
      "email": "john@example.com",
      "password": "SecurePassword123!",
      "confirm_password": "SecurePassword123!"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
      "message": "User created successfully"
  }
  ```
- **Error Response (400 Bad Request)**: Returns specific validation errors (e.g., "Passwords do not match" or "Email already exists").

### 2. User Login (Sign In)
Authenticates a user and returns a session token.

- **URL**: `/api/signin/`
- **Method**: `POST`
- **Payload (JSON)**:
  ```json
  {
      "email": "john@example.com",
      "password": "SecurePassword123!"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
      "token": "a1b2c3d4e5f6g7h8i9j0...",
      "user_id": 1,
      "email": "john@example.com",
      "full_name": "John Doe",
      "message": "Login successful"
  }
  ```
- **Error Response (400 Bad Request)**: Returns "Invalid email or password."

---

## 🛠️ Admin Panel
You can manage users and view the database directly via the Django Admin.

- **URL**: `http://127.0.0.1:8000/admin/`
- **Default Credentials (Local)**:
  - **Email**: `admin@example.com`
  - **Password**: `admin`

---

## 📝 Integration Notes
- **CORS**: The backend is configured to accept requests from common frontend ports (e.g., `localhost:3000`, `localhost:5173`).
- **Content-Type**: Always use `application/json` for POST requests.
- **CSRF**: Token authentication is stateless and does not require a CSRF token for the `/api/` endpoints.
