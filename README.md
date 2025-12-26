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


