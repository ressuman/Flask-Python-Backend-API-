# Flask API – User & Product Management System

## 📌 Overview

This is a modular **Flask REST API** for managing users and products.
It includes authentication using a Bearer token, user management, and product CRUD operations.

The project is structured using clean architecture principles:

- Controllers → Handle requests/responses
- Services → Business logic
- Models → Data structure
- Routes → API endpoints
- Utils → Helpers (auth, hashing, responses)
- Database → SQLite connection

---

## 🚀 Features

### 👤 User Management

- Register new users
- Login users
- View all users (protected)
- View single user (protected)
- Update user (protected)
- Delete user (protected)

### 📦 Product Management

- Create product (protected)
- Get all products
- Get single product
- Update product (protected)
- Delete product (protected)

### 🔐 Authentication

- Bearer Token authentication
- Token blacklist (logout support)
- Protected routes using decorator

---

## 📁 Project Structure

```
flask-api/
│
├── app.py
├── create_db.py
├── products.db
│
├── config/
│   ├── __init__.py
│   └── settings.py
│
├── database/
│   ├── __init__.py
│   └── connection.py
│
├── models/
│   ├── __init__.py
│   ├── product_model.py
│   └── user_model.py
│
├── services/
│   ├── __init__.py
│   ├── product_service.py
│   └── user_service.py
│
├── controllers/
│   ├── __init__.py
│   ├── product_controller.py
│   └── user_controller.py
│
├── routes/
│   ├── __init__.py
│   ├── product_routes.py
│   └── user_routes.py
│
├── utils/
│   ├── __init__.py
│   ├── auth.py
│   ├── hashing.py
│   └── helpers.py
│
├── requirements.txt
└── .env
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd flask-api
```

---

### 2. Create virtual environment

```bash
python -m venv .venv
```

### Activate it:

**Windows**

```bash
.venv\Scripts\activate
```

**Mac/Linux**

```bash
source .venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Create `.env` file

```env
API_TOKEN=mysecrettoken
```

---

### 5. Initialize database

```bash
python create_db.py
```

---

### 6. Run the server

```bash
python app.py
```

Server runs on:

```
http://127.0.0.1:5000
```

---

## 🔐 Authentication (IMPORTANT)

This API uses a **Bearer Token**.

### How to use it in Postman:

```
Authorization: Bearer mysecrettoken
```

---

## 📡 API Endpoints

### 🏠 Base

```
GET /
```

---

## 👤 Users

### Register

```
POST /register
```

Body:

```json
{
  "username": "john",
  "password": "password123"
}
```

---

### Login

```
POST /login
```

---

### Logout

```
POST /logout
(Protected)
```

---

### Get All Users

```
GET /users
(Protected)
```

---

### Get Single User

```
GET /users/<id>
(Protected)
```

---

### Update User

```
PUT /users/<id>
(Protected)
```

---

### Delete User

```
DELETE /users/<id>
(Protected)
```

---

## 📦 Products

### Get All Products

```
GET /products
```

---

### Get Single Product

```
GET /products/<id>
```

---

### Create Product

```
POST /products
(Protected)
```

Body:

```json
{
  "name": "Laptop",
  "price": 1500
}
```

---

### Update Product

```
PUT /products/<id>
(Protected)
```

---

### Delete Product

```
DELETE /products/<id>
(Protected)
```

---

## 🧪 Testing (Postman)

1. Register users
2. Login
3. Add Authorization header:

```
Bearer mysecrettoken
```

4. Test protected routes

---

## ⚠️ Known Limitations

- Uses a **single global token**
- Logout invalidates the token for all users
- No per-user authentication (yet)

---

## 🚀 Future Improvements

- JWT Authentication (recommended)
- Role-based access (admin/user)
- SQLAlchemy ORM
- Pagination for APIs
- Deployment (Render, AWS, Railway)

---

## 🧠 Key Concepts

### 🔹 Blueprints

Flask Blueprints allow splitting routes into modules:

- `user_routes` → user endpoints
- `product_routes` → product endpoints

Keeps code clean and scalable.

---

### 🔹 Services Layer

Handles logic like:

- Creating users
- Hashing passwords
- Database queries

---

### 🔹 Controllers

Handle:

- Request validation
- Response formatting

---

## 👨‍💻 Author

Built as a learning project to understand:

- Flask architecture
- REST APIs
- Authentication
- Clean code structure

---

## 📜 License

This project is open for learning and personal use.
