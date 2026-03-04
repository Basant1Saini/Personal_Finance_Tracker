import React, { useState, useEffect } from 'react';
import { createTransaction, updateTransaction, getCategories, createCategory } from '../services/api';

const DEFAULT_CATEGORIES = [
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Food', type: 'expense' },
  { name: 'Transport', type: 'expense' },
  { name: 'Housing', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
];

const TransactionForm = ({ onTransactionAdded, editingTransaction, onCancelEdit }) => {
  const [formData, setFormData] = useState({ categoryId: '', amount: '', date: '', description: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        categoryId: editingTransaction.categoryId?._id || '',
        amount: editingTransaction.amount,
        date: new Date(editingTransaction.date).toISOString().split('T')[0],
        description: editingTransaction.description || ''
      });
    } else {
      setFormData({ categoryId: '', amount: '', date: '', description: '' });
    }
  }, [editingTransaction]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      if (response.data.length === 0) {
        for (const cat of DEFAULT_CATEGORIES) await createCategory(cat);
        const fresh = await getCategories();
        setCategories(fresh.data);
      } else {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, formData);
      } else {
        await createTransaction(formData);
      }
      setFormData({ categoryId: '', amount: '', date: '', description: '' });
      onTransactionAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      alert(editingTransaction ? 'Error updating transaction' : 'Error adding transaction');
    } finally {
      setLoading(false);
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="transaction-form">
      <h3>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {incomeCategories.length > 0 && (
            <optgroup label="Income">
              {incomeCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </optgroup>
          )}
          {expenseCategories.length > 0 && (
            <optgroup label="Expenses">
              {expenseCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </optgroup>
          )}
        </select>
        <input
          type="number" placeholder="Amount" min="0.01" step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <input
          type="date" value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        <input
          type="text" placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (editingTransaction ? 'Update Transaction' : 'Add Transaction')}
          </button>
          {editingTransaction && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
