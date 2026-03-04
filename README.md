# Personal Finance Tracker

> A full-stack MERN application to track income, expenses, budgets, and financial goals — with charts, filtering, and a responsive UI.

**Live Demo:** https://basant1saini.github.io/Personal_Finance_Tracker

## Features

- **Income & Expense Tracking** — Add, edit, delete and filter transactions by date and type
- **Dashboard Summary** — Monthly income, expenses, and net balance cards
- **Data Visualization** — Spending by category (Pie chart) + monthly income vs expenses (Bar chart)
- **Budget Management** — Set monthly/yearly budgets per category with live progress bars
- **Goal Tracking** — Create savings goals, deposit progress, and track completion
- **User Authentication** — JWT-based auth with 7-day token expiry and bcrypt password hashing
- **Responsive Design** — Works on desktop, tablet, and mobile

## Tech Stack (MERN)

- **MongoDB** — NoSQL database (MongoDB Atlas for production)
- **Express.js** v4.19.2 — REST API with ES6 modules
- **React** v18.2.0 — Frontend SPA with hooks
- **Node.js** — Backend runtime
- **Chart.js** + react-chartjs-2 — Data visualization
- **JWT** + bcryptjs — Authentication
- **Axios** — HTTP client

## Project Structure

```
Personal_Finance_Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                # JWT auth middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Transaction.js
│   │   ├── Budget.js
│   │   └── Goal.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   ├── categories.js
│   │   ├── budgets.js
│   │   └── goals.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── SummaryCards.js
│   │   │   ├── SpendingChart.js
│   │   │   ├── MonthlyChart.js
│   │   │   ├── TransactionForm.js
│   │   │   └── TransactionList.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── BudgetsPage.js
│   │   │   └── GoalsPage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   ├── .env                       # Local env (gitignored)
│   ├── .env.production            # Production env
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

### ✅ Phase 2: Features (COMPLETED)
- [x] Budget creation and tracking with progress bars
- [x] Dashboard summary cards (income / expenses / balance)
- [x] Enhanced transaction filtering (date range, type)
- [x] Transaction edit (PUT endpoint + UI)
- [x] Default category seeding (deduplication fixed)

### ✅ Phase 3: Analytics (COMPLETED)
- [x] Spending by category — Pie chart (Chart.js)
- [x] Monthly income vs expenses — Bar chart
- [x] Goal tracking dashboard with deposit functionality
- [x] Mobile responsive layout
- [x] GitHub Pages deployment

## Getting Started (Local)

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Basant1Saini/Personal_Finance_Tracker.git
   cd Personal_Finance_Tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Backend Environment Variables**

   Create `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/finance_tracker
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

5. **Frontend Environment Variables**

   Create `frontend/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Default Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

### Frontend — GitHub Pages

The React app is deployed to GitHub Pages automatically via the `gh-pages` package.

```bash
cd frontend
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch.
Live URL: https://basant1saini.github.io/Personal_Finance_Tracker

### Backend — Render (Free Tier)

> ⚠️ **TODO:** Complete these steps to make the live demo fully functional.

1. Go to https://render.com → Sign in with GitHub
2. **New → Web Service** → Select this repository
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | MongoDB Atlas connection string |
   | `JWT_SECRET` | Any random secret string |
   | `PORT` | `5000` |
5. After deploy, copy the Render URL (e.g. `https://your-app.onrender.com`)
6. Update `frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-app.onrender.com/api
   ```
7. Redeploy frontend: `cd frontend && npm run deploy`

### Database — MongoDB Atlas (Free Tier)

> ⚠️ **TODO:** Required for Render backend deployment.

1. Go to https://mongodb.com/atlas → Sign up free
2. Create a free **M0 cluster**
3. **Database Access** → Add user with password
4. **Network Access** → Add IP `0.0.0.0/0`
5. **Connect → Drivers** → Copy connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/finance_tracker
   ```
6. Paste this as `MONGODB_URI` in Render environment variables

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get transactions (supports `?startDate`, `?endDate`, `?type`, `?categoryId`) |
| GET | `/api/transactions/summary` | Monthly totals: income, expenses, balance, by-category |
| GET | `/api/transactions/monthly` | 12-month income/expense breakdown for charts |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all user categories |
| POST | `/api/categories` | Create category |

### Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/budgets` | Get all budgets with live spent calculation |
| POST | `/api/budgets` | Create budget |
| PUT | `/api/budgets/:id` | Update budget |
| DELETE | `/api/budgets/:id` | Delete budget |

### Goals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create goal |
| PUT | `/api/goals/:id` | Update goal / add progress |
| DELETE | `/api/goals/:id` | Delete goal |

## MongoDB Collections

- **Users** — `_id`, `username`, `email`, `password` (hashed), `createdAt`, `updatedAt`
- **Categories** — `_id`, `name`, `type` (income/expense), `userId`, `createdAt`, `updatedAt`
- **Transactions** — `_id`, `userId`, `categoryId`, `amount`, `date`, `description`, `createdAt`, `updatedAt`
- **Budgets** — `_id`, `userId`, `categoryId`, `amount`, `period`, `month`, `year`, `createdAt`, `updatedAt`
- **Goals** — `_id`, `userId`, `name`, `targetAmount`, `currentAmount`, `deadline`, `createdAt`, `updatedAt`

## Project Architecture

- **Backend** — RESTful API with Express.js and Mongoose ODM, ES6 modules
- **Frontend** — Single Page Application with React Router (HashRouter for GitHub Pages)
- **Database** — MongoDB with Mongoose schemas
- **Authentication** — JWT tokens (7-day expiry) with bcrypt password hashing
- **State Management** — React hooks + localStorage for token
- **Charts** — Chart.js via react-chartjs-2 (Pie + Bar)
- **Deployment** — Frontend on GitHub Pages, Backend on Render (free tier)
