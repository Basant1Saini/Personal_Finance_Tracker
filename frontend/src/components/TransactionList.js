import React from 'react';
import { deleteTransaction } from '../services/api';

const TransactionList = ({ transactions, onTransactionDeleted }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        onTransactionDeleted();
      } catch (error) {
        alert('Error deleting transaction');
      }
    }
  };

  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        transactions.map(transaction => (
          <div key={transaction._id} className="transaction-item">
            <div>
              <strong>{transaction.categoryId?.name}</strong>
              <p>{transaction.description}</p>
              <small>{new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <div>
              <span style={{color: transaction.categoryId?.type === 'income' ? 'green' : 'red'}}>
                ${transaction.amount}
              </span>
              <button 
                onClick={() => handleDelete(transaction._id)}
                className="btn btn-danger"
                style={{marginLeft: '10px'}}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;