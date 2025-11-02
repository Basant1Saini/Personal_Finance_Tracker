# Personal Finance Tracker

## Project Overview
A comprehensive personal finance management application to track income, expenses, budgets, and financial goals.

## Features
- **Income & Expense Tracking**: Record and categorize transactions
- **Budget Management**: Set and monitor monthly/yearly budgets
- **Financial Reports**: Generate spending analysis and trends
- **Goal Setting**: Track savings goals and progress
- **Data Visualization**: Charts and graphs for financial insights

## Tech Stack
- **Backend**: Python/Flask or Node.js/Express
- **Database**: SQLite/PostgreSQL
- **Frontend**: React/Vue.js or HTML/CSS/JavaScript
- **Charts**: Chart.js or D3.js

## Project Structure
```
Personal_Finance_Tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── database/
│   └── schema.sql
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
2. Set up virtual environment
3. Install dependencies
4. Initialize database
5. Run the application

## Database Schema
- **Users**: id, username, email, password_hash
- **Categories**: id, name, type (income/expense)
- **Transactions**: id, user_id, category_id, amount, date, description
- **Budgets**: id, user_id, category_id, amount, period
- **Goals**: id, user_id, name, target_amount, current_amount, deadline