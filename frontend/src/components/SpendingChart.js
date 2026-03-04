import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

const SpendingChart = ({ byCategory }) => {
  if (!byCategory || byCategory.length === 0) {
    return (
      <div className="chart-container">
        <h3>Spending by Category</h3>
        <p className="no-data">No expense data for this month</p>
      </div>
    );
  }

  const data = {
    labels: byCategory.map(c => c.name),
    datasets: [{
      data: byCategory.map(c => c.amount),
      backgroundColor: COLORS.slice(0, byCategory.length),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.label}: $${ctx.raw.toFixed(2)}` }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Spending by Category <span className="chart-subtitle">(this month)</span></h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default SpendingChart;
