# memberengine-fullstackproject
# memberengine-fullstackproject
# MemberEngine – Subscription-Based Blogging Platform

MemberEngine is a **full-stack web application** that demonstrates a **membership-based SaaS platform** where users can sign up, subscribe to plans, and write blog posts based on their subscription tier.

This project showcases **authentication, subscription management, and content creation** using modern web technologies.

---

# Features

### User Authentication

* User registration and login
* Password hashing with bcrypt
* Session management using JWT
* Protected routes with middleware

### Subscription Plans

Three subscription tiers:

**Starter (Free)**

* Write up to 3 blog posts
* Basic editor
* Standard publishing

**Pro**

* Unlimited blog posts
* Featured posts
* Priority visibility
* Analytics access

**Enterprise**

* Everything in Pro
* Team collaboration
* Advanced analytics
* API access

### Blog System

* Create blog posts
* Mark posts as featured (Pro+ users)
* Store blogs in MySQL database
* Each blog linked to a user

### Pricing System

* Monthly / Yearly pricing toggle
* Upgrade plans
* Downgrade restrictions
* Simulated payment page

### UI / UX

* Dark SaaS theme
* Gold premium design
* Responsive layout
* Modern pricing cards

---

# Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Authentication

* bcryptjs
* jsonwebtoken (JWT)

### Development Tools

* Nodemon
* Concurrently
* Live Server

---

# Project Structure

```
memberengine/
│
├── memberengine-backend
│   ├── controllers
│   │   ├── authController.js
│   │   └── paymentController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── index.html
├── pricing.html
├── blog.html
├── docs.html
├── signin.html
├── signup.html
├── payment.html
├── style.css
├── script.js
└── auth.js
```

---

# Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    plan ENUM('Starter','Pro','Enterprise') DEFAULT 'Starter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Blogs Table

```sql
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    content TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

# Installation & Setup

### 1 Clone the Repository

```bash
git clone https://github.com/yourusername/memberengine.git
cd memberengine
```

---

### 2 Install Backend Dependencies

```bash
cd memberengine-backend
npm install
```

---

### 3 Configure Environment Variables

Create a `.env` file inside backend:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=memberengine
JWT_SECRET=your_secret_key
```

---

### 4 Start the Application

Run both frontend and backend:

```bash
npm run dev
```
Backend:
```
http://localhost:5000
```
Frontend:

```
http://localhost:3000
```
---
# Usage

1. Create an account.
2. Login to the platform.
3. Default plan = **Starter**.
4. Upgrade to **Pro or Enterprise** from the pricing page.
5. Start writing blog posts.

---

# Future Improvements

* Blog comments
* Blog likes
* Admin dashboard
* Real payment integration (Stripe)
* Rich text editor
* Blog categories & tags
* Public blog feed

---

# License

This project is built for **educational and learning purposes**.

---

# Author

Developed by **Yamini Bathini**

GitHub:https://github.com/Yamini-Bathini/memberengine-fullstackproject/



