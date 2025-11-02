import React, { useState, useEffect } from 'react';
import { createTransaction, getCategories, createCategory } from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    date: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      
      // Create default categories if none exist
      if (response.data.length === 0) {
        await createCategory({ name: 'Food', type: 'expense' });
        await createCategory({ name: 'Salary', type: 'income' });
        loadCategories();
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      setFormData({ categoryId: '', amount: '', date: '', description: '' });
      onTransactionAdded();
    } catch (error) {
      alert('Error adding transaction');
    }
  };

  return (
    <div className="transaction-form">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name} ({cat.type})</option>
          ))}
        </select>
        
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        
        <button type="submit" className="btn btn-primary">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;