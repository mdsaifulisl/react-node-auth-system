# React + Node.js Authentication System

A full authentication system with email OTP verification, secure login, and password reset functionality.

## Features

- User Registration with Email OTP Verification
- Password saved only after OTP verification
- Secure Login using Email & Password
- Forgot Password flow with OTP verification
- Password hashing using bcrypt
- Email sending using Nodemailer

## Tech Stack

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: MySQL
- Security: bcrypt
- Email Service: Nodemailer


# Authentication System | React + Node.js

A full-stack authentication system built as part of my web development learning journey.  
This project focuses on real-world authentication flow, security, and OTP-based verification.

---

## ✨ Features

- User Registration with Email OTP Verification
- Password is saved only after OTP verification
- Secure Login using Email & Password
- Forgot Password functionality with OTP verification
- Password hashing using bcrypt
- Email sending using Nodemailer
- Step-based Forgot Password flow

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Bootstrap
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MySQL
- bcrypt
- Nodemailer

---

## 🔐 Authentication Flow

1. **Register**
   - User enters name & email
   - OTP is sent to email
   - Password is saved only after OTP verification

2. **Login**
   - Email & password authentication
   - Password comparison using bcrypt

3. **Forgot Password**
   - Enter registered email
   - Receive OTP
   - Verify OTP
   - Set new password

---

## 🗄 Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(255),
  otp VARCHAR(6),
  otp_expires_at DATETIME,
  is_verified TINYINT(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


## Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(255),
  otp VARCHAR(6),
  otp_expires_at DATETIME,
  is_verified TINYINT(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


