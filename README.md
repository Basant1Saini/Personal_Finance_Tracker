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
- **Express.js**: Backend web framework for Node.js
- **React**: Frontend JavaScript library for UI
- **Node.js**: JavaScript runtime for backend development
- **Charts**: Chart.js for data visualization

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

## Development Phases

### Phase 1: Core Setup
- [ ] Database schema design
- [ ] Basic CRUD operations for transactions
- [ ] User authentication
- [ ] Simple UI for data entry

### Phase 2: Features
- [ ] Category management
- [ ] Budget creation and tracking
- [ ] Basic reporting
- [ ] Data import/export

### Phase 3: Analytics
- [ ] Financial charts and graphs
- [ ] Spending trends analysis
- [ ] Goal tracking dashboard
- [ ] Mobile responsiveness

## Getting Started
1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up MongoDB connection
5. Run backend: `npm run dev`
6. Run frontend: `npm start`

## MongoDB Collections
- **Users**: _id, username, email, password_hash, createdAt
- **Categories**: _id, name, type (income/expense), userId, createdAt
- **Transactions**: _id, userId, categoryId, amount, date, description, createdAt
- **Budgets**: _id, userId, categoryId, amount, period, createdAt
- **Goals**: _id, userId, name, targetAmount, currentAmount, deadline, createdAt