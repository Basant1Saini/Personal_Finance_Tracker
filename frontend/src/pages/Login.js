import React, { useState } from 'react';
import { login, register } from '../services/api';

const Login = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin 
        ? await login(formData.email, formData.password)
        : await register(formData.username, formData.email, formData.password);
      
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
        )}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer'}}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;