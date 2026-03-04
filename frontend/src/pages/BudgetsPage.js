import React, { useState, useEffect } from 'react';
import { getBudgets, createBudget, deleteBudget, getCategories } from '../services/api';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    period: 'monthly',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  useEffect(() => {
    loadBudgets();
    loadCategories();
  }, []);

  const loadBudgets = async () => {
    try {
      const res = await getBudgets();
      setBudgets(res.data);
    } catch (err) {
      console.error('Error loading budgets:', err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.filter(c => c.type === 'expense'));
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBudget(formData);
      setFormData({ categoryId: '', amount: '', period: 'monthly', month: new Date().getMonth() + 1, year: new Date().getFullYear() });
      setShowForm(false);
      loadBudgets();
    } catch (err) {
      alert('Error creating budget');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this budget?')) {
      try {
        await deleteBudget(id);
        loadBudgets();
      } catch (err) {
        alert('Error deleting budget');
      }
    }
  };

  const getProgressColor = (spent, amount) => {
    const pct = (spent / amount) * 100;
    if (pct >= 100) return '#dc3545';
    if (pct >= 80) return '#ffc107';
    return '#28a745';
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Budgets</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Budget'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Create Budget</h3>
          <form onSubmit={handleSubmit} className="budget-form">
            <select value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})} required>
              <option value="">Select Expense Category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <input type="number" placeholder="Budget Amount" min="0.01" step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
            <select value={formData.period}
              onChange={(e) => setFormData({...formData, period: e.target.value})}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {formData.period === 'monthly' && (
              <select value={formData.month}
                onChange={(e) => setFormData({...formData, month: parseInt(e.target.value)})}>
                {MONTH_NAMES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            )}
            <input type="number" placeholder="Year" value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} required />
            <button type="submit" className="btn btn-primary">Create Budget</button>
          </form>
        </div>
      )}

      {budgets.length === 0 ? (
        <div className="empty-state">
          <p>No budgets set yet.</p>
          <p>Create a budget to start tracking your spending limits!</p>
        </div>
      ) : (
        <div className="budgets-grid">
          {budgets.map(budget => {
            const spent = budget.spent || 0;
            const pct = Math.min((spent / budget.amount) * 100, 100);
            const color = getProgressColor(spent, budget.amount);
            const remaining = budget.amount - spent;
            return (
              <div key={budget._id} className="budget-card">
                <div className="budget-header">
                  <h4>{budget.categoryId?.name}</h4>
                  <span className="budget-period">
                    {budget.period === 'monthly'
                      ? `${MONTH_NAMES[budget.month - 1]} ${budget.year}`
                      : `${budget.year} (yearly)`}
                  </span>
                </div>
                <div className="budget-amounts">
                  <span className="spent">${spent.toFixed(2)} spent</span>
                  <span className="total">of ${budget.amount.toFixed(2)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
                <div className="budget-footer">
                  <span style={{ color }}>{pct.toFixed(0)}% used</span>
                  <span style={{ color: remaining >= 0 ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                    {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
                  </span>
                  <button onClick={() => handleDelete(budget._id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;
