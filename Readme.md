# 🛒 eCommerce Website

A full-stack eCommerce platform built with **Node.js**, **Express.js**, **MongoDB**, and **React.js**. It supports user and admin roles with functionality like product 
This project Mainly focuses on Backend

## 📌 Features
listing, cart management, user authentication, admin controls, and secure checkout flows.

### 👤 User Side
- User registration and login with role-based access
- View products, filter/sort by categories
- Add/remove items from cart
- Place orders and track status
- Password recovery via email (NodeMailer)

### 🛠️ Admin Side
- Admin dashboard to manage users and products
- Add/edit/delete products
- View all orders
- Role-based access control

### 🔐 Security
- Passwords encrypted with **SHA-256**
- JWT-based authentication
- Protected routes for admin and user

---

## 🧰 Tech Stack

| Area       | Technology |
|------------|------------|
| Backend    | Node.js, Express.js, MongoDB, Mongoose |
| Frontend   | React.js, Redux |
| Security   | JWT, Crypto (SHA-256), NodeMailer |
| Tools      | Postman, MongoDB Compass, VS Code |

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### 2. install the files using npm command
```bash
//install the dependencies for backend
cd backend
npm i

// go back to the previous folder
cd ../

//install the dependencies for frontend
cd frontend
npm i
```


### 3. Setup .env
```bash
# this is config.env

PORT = 3000

DB_URI = "mongodb://localhost:27017/ecommerce"

JWT_SECRET = placeyoursecrethere
JWT_EXPIRE = 5d

COOKIE_EXPIRE = 5

SMPT_SERVICE ="gmail"
SMPT_MAIL= "sample@gmail.com"
SMPT_PASSWORD="sample@password"
```

### 4. sample CURL to insert a new user into the backend (check if its working xD)
```bash
curl --location 'http://localhost:3000/api/v1/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmI5YTczZTRiOTk5Y2I4Y2ZlZGY5ZSIsImlhdCI6MTc0NDU0MjMyNCwiZXhwIjoxNzQ0OTc0MzI0fQ.322LJOp11qlfGlRcLnQWbz7S_8C8k15cAyZYgsRcJF0' \
--data-raw '{
    "name":"anshu",
    "email":"anshu@gmail.com",
    "password":"anshu@gmail"
}'
```
