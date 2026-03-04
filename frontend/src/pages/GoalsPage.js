import React, { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../services/api';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updatingGoalId, setUpdatingGoalId] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [formData, setFormData] = useState({ name: '', targetAmount: '', currentAmount: '', deadline: '' });

  useEffect(() => { loadGoals(); }, []);

  const loadGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res.data);
    } catch (err) {
      console.error('Error loading goals:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGoal(formData);
      setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
      setShowForm(false);
      loadGoals();
    } catch (err) {
      alert('Error creating goal');
    }
  };

  const handleDeposit = async (goal) => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) return alert('Enter a valid amount');
    try {
      await updateGoal(goal._id, { currentAmount: goal.currentAmount + amount });
      setUpdatingGoalId(null);
      setDepositAmount('');
      loadGoals();
    } catch (err) {
      alert('Error updating goal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this goal?')) {
      try {
        await deleteGoal(id);
        loadGoals();
      } catch (err) {
        alert('Error deleting goal');
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Financial Goals</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Create Goal</h3>
          <form onSubmit={handleSubmit} className="goal-form">
            <input type="text" placeholder="Goal Name (e.g. Emergency Fund)"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="number" placeholder="Target Amount" min="0.01" step="0.01"
              value={formData.targetAmount}
              onChange={(e) => setFormData({...formData, targetAmount: e.target.value})} required />
            <input type="number" placeholder="Starting Amount (optional)" min="0" step="0.01"
              value={formData.currentAmount}
              onChange={(e) => setFormData({...formData, currentAmount: e.target.value})} />
            <input type="date" placeholder="Deadline (optional)"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
            <button type="submit" className="btn btn-primary">Create Goal</button>
          </form>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="empty-state">
          <p>No goals set yet.</p>
          <p>Create a goal to start tracking your savings progress!</p>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => {
            const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isComplete = goal.currentAmount >= goal.targetAmount;
            const remaining = goal.targetAmount - goal.currentAmount;
            return (
              <div key={goal._id} className={`goal-card ${isComplete ? 'goal-complete' : ''}`}>
                <div className="goal-header">
                  <h4>{goal.name} {isComplete && '🎉'}</h4>
                  {goal.deadline && (
                    <span className="goal-deadline">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="goal-amounts">
                  <span className="current">${goal.currentAmount.toFixed(2)}</span>
                  <span className="separator"> / </span>
                  <span className="target">${goal.targetAmount.toFixed(2)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill"
                    style={{ width: `${pct}%`, backgroundColor: isComplete ? '#28a745' : '#007bff' }} />
                </div>
                <p className="goal-pct">{pct.toFixed(1)}% achieved
                  {!isComplete && <span className="goal-remaining"> · ${remaining.toFixed(2)} to go</span>}
                </p>

                {!isComplete && (
                  updatingGoalId === goal._id ? (
                    <div className="deposit-form">
                      <input type="number" placeholder="Deposit amount" min="0.01" step="0.01"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)} />
                      <button className="btn btn-primary btn-sm" onClick={() => handleDeposit(goal)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setUpdatingGoalId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="btn btn-primary btn-sm goal-deposit-btn"
                      onClick={() => { setUpdatingGoalId(goal._id); setDepositAmount(''); }}>
                      + Add Progress
                    </button>
                  )
                )}

                <button onClick={() => handleDelete(goal._id)} className="btn btn-danger btn-sm goal-delete-btn">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
