import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions } from '../services/api';

const Dashboard = ({ setToken }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="container">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Personal Finance Tracker</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </header>
      
      <TransactionForm onTransactionAdded={loadTransactions} />
      <TransactionList transactions={transactions} onTransactionDeleted={loadTransactions} />
    </div>
  );
};

export default Dashboard;