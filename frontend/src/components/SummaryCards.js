import React from 'react';

const SummaryCards = ({ summary }) => {
  const { totalIncome = 0, totalExpenses = 0, balance = 0 } = summary;

  return (
    <div className="summary-cards">
      <div className="summary-card card-income">
        <div className="card-icon">↑</div>
        <div className="card-content">
          <p className="card-label">Total Income</p>
          <p className="card-amount income">+${totalIncome.toFixed(2)}</p>
        </div>
      </div>
      <div className="summary-card card-expense">
        <div className="card-icon">↓</div>
        <div className="card-content">
          <p className="card-label">Total Expenses</p>
          <p className="card-amount expense">-${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
      <div className="summary-card card-balance">
        <div className="card-icon">⚖</div>
        <div className="card-content">
          <p className="card-label">Net Balance</p>
          <p className={`card-amount ${balance >= 0 ? 'income' : 'expense'}`}>
            {balance >= 0 ? '+' : ''}${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
