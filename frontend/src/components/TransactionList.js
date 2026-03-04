import React from 'react';
import { deleteTransaction } from '../services/api';

const TransactionList = ({ transactions, onTransactionDeleted, onEditTransaction }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
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
        <p className="no-data">No transactions found</p>
      ) : (
        transactions.map(t => (
          <div key={t._id} className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-category">
                <span className={`type-badge ${t.categoryId?.type}`}>
                  {t.categoryId?.type === 'income' ? '↑' : '↓'}
                </span>
                <strong>{t.categoryId?.name}</strong>
              </div>
              {t.description && <p className="transaction-desc">{t.description}</p>}
              <small className="transaction-date">{new Date(t.date).toLocaleDateString()}</small>
            </div>
            <div className="transaction-actions">
              <span className={`amount ${t.categoryId?.type === 'income' ? 'income' : 'expense'}`}>
                {t.categoryId?.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
              </span>
              <div className="action-buttons">
                <button onClick={() => onEditTransaction(t)} className="btn btn-secondary btn-sm">Edit</button>
                <button onClick={() => handleDelete(t._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
