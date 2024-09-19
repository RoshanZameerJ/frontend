// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/ResetPassword.css'; // Ensure this file exists

const ResetPasswordPage = () => {
  const { token } = useParams(); // Retrieve token from URL
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/v1.0/shopping/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        navigate('/'); // Redirect to login page
      } else {
        setError('Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="text-center">Reset Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
