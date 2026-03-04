import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">💰 Finance Tracker</div>
      <div className="navbar-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/budgets" className={location.pathname === '/budgets' ? 'active' : ''}>Budgets</Link>
        <Link to="/goals" className={location.pathname === '/goals' ? 'active' : ''}>Goals</Link>
      </div>
      <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
    </nav>
  );
};

export default Navbar;
