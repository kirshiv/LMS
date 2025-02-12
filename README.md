# Lecture Management App

A full-stack Lecture Management Application built using **Node.js, Express, React, and MongoDB**. This app allows administrators to create and manage lectures while providing users with the ability to enroll in courses through a seamless payment integration using **Stripe**.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Role-Based Access Control**: Admins can create, update, and delete lectures, while users can enroll.
- **Lecture Management**: CRUD operations for lectures (Create, Read, Update, Delete).
- **Payment Integration**: Secure payment handling with **Stripe**.
- **Lecture Scheduling**: Users can schedule and track their enrolled lectures.
- **Dashboard**: Admin panel to monitor user enrollments and payment transactions.
- **Notifications**: Email notifications for enrollments and payment confirmations.
- **Search and Filtering**: Easily find lectures by category, instructor, or date.
- **Responsive UI**: User-friendly frontend built with React.

---

## 🛠️ Tech Stack

### Frontend:

- React.js
- Redux (for state management)
- Tailwind CSS / Material UI (for styling)

### Backend:

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT Authentication
- Stripe API for payments

### DevOps & Deployment:
 
- CI/CD (GitHub Actions or similar)

---

## 📦 Installation & Setup

1. **Clone the repository**:

   ```sh
   git clone https://github.com/kirshiv/LMS.git
   cd lecture-management-app
   ```

2. **Install dependencies**:

   - Backend:
     cd server
     npm install
     ```
   - Frontend:
     ```sh
     cd client
     cd LMS
     npm install
     ```

3. **Set up environment variables**: Create a `.env` file in the **backend** directory and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the application**:

   - Start backend server:
     ```sh
     cd server
     npm run dev
     ```
   - Start frontend server:
     ```sh
     cd client
     cd LMS
     npm run dev
     ```

---

## ⚡ API Endpoints

### **User Authentication**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### **Lecture Management**

- `GET /api/lectures` - Get all lectures
- `POST /api/lectures` - Create a new lecture (Admin only)
- `PUT /api/lectures/:id` - Update a lecture (Admin only)
- `DELETE /api/lectures/:id` - Delete a lecture (Admin only)

### **Payments (Stripe Integration)**

- `POST /api/payment` - Process payment for a lecture
- `GET /api/payment/history` - View payment history

---

## 🖥️ Deployment

1. **Frontend Deployment:**

   - Build the React app:
     ```sh
     npm run build
     ```
   - Deploy to Vercel, Netlify, or any static hosting provider.

2. **Backend Deployment:**

   - Use MongoDB Atlas for the database.
   - Set environment variables in the hosting provider.

---
## Live Site :
    https://lms-wwi2.onrender.com/
## 🤝 Contributing

Feel free to fork this repository and submit pull requests. Open issues for bug reports or feature requests!

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💬 Contact

For any questions or collaboration inquiries:

- Email: [rainakirtan27@example.com](rainakirtan27@example.com)
- LinkedIn: [Kirtan Raina](https://linkedin.com/in/kirtanraina)
- GitHub: [kirshiv](https://github.com/kirshiv)

Happy Coding! 🚀

