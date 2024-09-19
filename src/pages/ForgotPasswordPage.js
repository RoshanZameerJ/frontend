// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ForgotPassword.css'; // Ensure this file exists

const ForgotPasswordPage = () => {
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!loginId) {
      setError('Please enter your login ID');
      return;
    }

    try {
      // Perform a GET request with the loginId as a query parameter
      const response = await fetch(`http://localhost:5000/api/v1.0/shopping/forgot?loginId=${encodeURIComponent(loginId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          alert('Password reset token generated. Redirecting to reset page.');
          navigate(`/reset-password/${data.token}`); // Navigate to reset page with token
        } else {
          setError('Unexpected response format');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to generate reset token');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="text-center">Forgot Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleForgotPassword}>
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
          <button type="submit" className="btn btn-primary">Send Reset Token</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
