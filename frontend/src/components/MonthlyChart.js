import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyChart = ({ monthlyData }) => {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="chart-container">
        <h3>Monthly Overview</h3>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(m => m.income),
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(m => m.expenses),
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => `$${v}` }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Monthly Overview <span className="chart-subtitle">({new Date().getFullYear()})</span></h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
