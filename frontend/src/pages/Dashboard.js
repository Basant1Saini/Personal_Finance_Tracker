import React, { useState, useEffect, useCallback } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryCards from '../components/SummaryCards';
import SpendingChart from '../components/SpendingChart';
import MonthlyChart from '../components/MonthlyChart';
import { getTransactions, getTransactionSummary, getMonthlyData } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0, byCategory: [] });
  const [monthlyData, setMonthlyData] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '' });

  const loadAll = useCallback(async () => {
    const now = new Date();
    const params = {};
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.type) params.type = filters.type;

    const [txRes, sumRes, monthRes] = await Promise.allSettled([
      getTransactions(params),
      getTransactionSummary({ month: now.getMonth() + 1, year: now.getFullYear() }),
      getMonthlyData(now.getFullYear())
    ]);

    if (txRes.status === 'fulfilled') setTransactions(txRes.value.data);
    if (sumRes.status === 'fulfilled') setSummary(sumRes.value.data);
    if (monthRes.status === 'fulfilled') setMonthlyData(monthRes.value.data);
  }, [filters]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    loadAll();
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '', type: '' });
  };

  return (
    <div className="container">
      <SummaryCards summary={summary} />

      <div className="charts-grid">
        <SpendingChart byCategory={summary.byCategory} />
        <MonthlyChart monthlyData={monthlyData} />
      </div>

      <TransactionForm
        onTransactionAdded={loadAll}
        editingTransaction={editingTransaction}
        onCancelEdit={() => setEditingTransaction(null)}
      />

      <div className="filter-section">
        <h3>Filter Transactions</h3>
        <form onSubmit={handleApplyFilters} className="filter-form">
          <div className="filter-group">
            <label>From</label>
            <input type="date" value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
          </div>
          <div className="filter-group">
            <label>To</label>
            <input type="date" value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
          </div>
          <div className="filter-group">
            <label>Type</label>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">Apply</button>
            <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>Clear</button>
          </div>
        </form>
      </div>

      <TransactionList
        transactions={transactions}
        onTransactionDeleted={loadAll}
        onEditTransaction={setEditingTransaction}
      />
    </div>
  );
};

export default Dashboard;
