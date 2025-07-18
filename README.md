# 🎓 LearnHub: Your Center for Skill Enhancement

Welcome to **LearnHub**, an innovative online learning platform built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Designed for passionate learners and educators, LearnHub delivers a seamless, accessible, and interactive digital learning experience.

---

## 🌟 Key Features

### **User Registration & Authentication**
- Secure sign-up/login system for Students, Teachers.

### **Course Management**
- Teachers can upload, update, and organize course materials easily.

### **Interactive Learning**
- Discussion forums, chat rooms, and live webinars to enhance engagement.

### **Progress Tracking**
- Students can track their learning progress and resume anytime.

### **Certification**
- Digital certificates awarded upon successful course completion.

### **Self-Paced Learning**
- Flexible, on-demand learning that fits individual schedules.

### **Payment Integration**
- Secure purchase options for accessing premium courses.

### **Role-Based Access Control**
- Custom dashboard for Students, Teachers, and Admins.

---

## 💡 Scenario-Based Use Case

Meet **Sarah**, an enthusiastic student aiming to learn web development. Sarah signs up on LearnHub, browses courses through a smart filtering system, and enrolls in "Web Development Fundamentals."  
She proceeds at her own pace, participates in live webinars, and engages in discussion forums. After completing the course and passing the final exam, Sarah receives a digital certificate.  
Later, she purchases an advanced course using LearnHub’s secure payment gateway.

Meanwhile, **John**, an experienced instructor, uploads new courses, manages enrollments, and interacts with students. The **Admin** oversees the entire platform, monitors activities, manages users, and ensures smooth operation.

---

## 🧱 Technical Architecture

### **🖥️ Frontend (React.js)**
- Responsive and user-friendly UI with Bootstrap and Material UI.
- Axios for API calls to backend services.
- Features:
  - Course browsing and filtering
  - Course enrollment and tracking
  - Role-based dashboards

### **🌐 Backend (Node.js + Express.js)**
- RESTful APIs to handle:
  - Authentication
  - Course management
  - Payment processing
  - User roles and permissions

### **🚪 API Gateway**
- Routes client requests to services:
  - Authentication
  - Courses
  - Payments
  - User Management

### **🔒 Authentication Service**
- Token-based login with role-based route protection.

### **🗃️ Database (MongoDB)**
- Stores:
  - User profiles and roles
  - Course content
  - Enrollment and payment data

### **📚 Course Browsing & Filtering**
- View all available courses.
- Filter by name, category, and difficulty level.

### **🛒 Payment & Enrollment Management**
- Handles:
  - Secure payments
  - Enrollment processing
  - Certificate management



## 🚀 Why Choose LearnHub?

**Accessible Learning:** Anytime, anywhere.
**Role-Based Views:** Custom dashboards for each user type.
**Secure Transactions:** Safe payments and data protection.
**Interactive & Engaging:** Live classes, forums, and instant feedback.



## 🛠️ Built With

**MongoDB** – Scalable NoSQL database for user and course data.
**Express.js** – Lightweight backend API framework.
**React.js** – Fast, component-based frontend.
**Node.js** – Scalable server environment for efficient operations.



## 👨‍💻 Project Contributors
|Name|Role|
|----|-----|
|Ummidi Swathi Anusha|Team Leader, developer|
|T Satya Narayana Reddy|developer|
|Divya Vaddi|developer|
|vardhineedi raja|developer|



📖 **Happy Learning with LearnHub!** 📖

---

## 🌐 Live Preview

 https://learn-hub-9.onrender.com

---



## 🎥 Video Demo

https://drive.google.com/file/d/1jO4-BxuhBMGO-lnzasqLhn1Z3uUDah4y/view?usp=sharing
--

## 📦 Installation & Setup

### 👉 Run Frontend
```bash
npm install
npm run dev
```

### 👉 Run Backend
```bash
npm install
npm run dev

###  .env

MONGO_DB = mongodb://localhost:27017/
JWT_KEY = my-secret-key-123-456-$
PORT = 8000