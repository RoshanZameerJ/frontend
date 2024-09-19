import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css'; // Custom CSS
//import LoginPage from '../test/Loginpage'

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

/*   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginId) {
      setError('Login ID is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1.0/shopping/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assume the response contains the token
        localStorage.setItem('authToken', data.token); // Store the token
        navigate('/Product'); // Redirect to the product page or another protected page
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred while trying to log in.');
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginId) {
      setError('Login ID is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/v1.0/shopping/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Store the token
        localStorage.setItem('loginId', loginId); // Store login ID for later checks
  
        // Check if the loginId and password match admin credentials
        if (loginId === 'admin' && password === 'admin123') {
          navigate('/admin-dashboard');
        } else {
          navigate('/Product');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred while trying to log in.');
    }
  };
 return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginId">Login ID</label>
            <input
              type="text"
              id="loginId"
              className="form-control"
              placeholder="Enter your login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Login</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;