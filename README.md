# Personal Finance Tracker

## Project Overview
A comprehensive personal finance management application to track income, expenses, budgets, and financial goals.

## Features
- **Income & Expense Tracking**: Record and categorize transactions
- **Budget Management**: Set and monitor monthly/yearly budgets
- **Financial Reports**: Generate spending analysis and trends
- **Goal Setting**: Track savings goals and progress
- **Data Visualization**: Charts and graphs for financial insights

## Tech Stack (MERN)
- **MongoDB**: NoSQL database for data storage
- **Express.js**: v4.19.2 - Backend web framework with ES6 modules
- **React**: v18.2.0 - Frontend JavaScript library with hooks
- **Node.js**: JavaScript runtime with ES6 module support
- **Additional**: JWT authentication, bcryptjs, axios, Chart.js

## Project Structure
```
Personal_Finance_Tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md
```

## Development Status

### ✅ Phase 1: Core Setup (COMPLETED)
- [x] Database schema design (MongoDB collections)
- [x] Basic CRUD operations for transactions
- [x] User authentication (JWT-based)
- [x] Simple UI for data entry (React components)
- [x] Category management system
- [x] Protected routes with middleware

### 🚧 Phase 2: Features (IN PROGRESS)
- [ ] Budget creation and tracking
- [ ] Basic reporting dashboard
- [ ] Data import/export functionality
- [ ] Enhanced transaction filtering

### 📋 Phase 3: Analytics (PLANNED)
- [ ] Financial charts and graphs
- [ ] Spending trends analysis
- [ ] Goal tracking dashboard
- [ ] Mobile responsiveness

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Personal_Finance_Tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create `.env` file in backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/finance_tracker
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

### Default Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get user categories
- `POST /api/categories` - Create new category

## MongoDB Collections
- **Users**: _id, username, email, password, createdAt, updatedAt
- **Categories**: _id, name, type (income/expense), userId, createdAt, updatedAt
- **Transactions**: _id, userId, categoryId, amount, date, description, createdAt, updatedAt
- **Budgets**: _id, userId, categoryId, amount, period, createdAt, updatedAt
- **Goals**: _id, userId, name, targetAmount, currentAmount, deadline, createdAt, updatedAt

## Features Implemented
- ✅ User registration and authentication
- ✅ JWT-based session management
- ✅ Transaction CRUD operations
- ✅ Category management with default categories
- ✅ Protected routes and middleware
- ✅ Responsive React UI
- ✅ ES6 modules throughout backend
- ✅ Modern React 18 with hooks

## Project Architecture
- **Backend**: RESTful API with Express.js and Mongoose ODM
- **Frontend**: Single Page Application with React Router
- **Database**: MongoDB with indexed collections
- **Authentication**: JWT tokens with bcrypt password hashing
- **State Management**: React hooks and local storage