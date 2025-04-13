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

### 1. install the files using npm command
```bash
//install the dependencies of backend
cd backend
npm i
// go back to the previous folder
cd ../

//install the dependencies of frontend
cd frontend
npm i
```


### 1. Setup .env
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
