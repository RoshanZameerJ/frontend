import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/RegisterPage.css'; // Custom CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '', // Added confirmPassword
    contactNumber: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, email, loginId, password, confirmPassword, contactNumber } = formData;

    if (!firstName) newErrors.firstName = 'First name is missing';
    if (!lastName) newErrors.lastName = 'Last name is missing';
    if (!email) newErrors.email = 'Email is missing';
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) newErrors.email = 'Email format is invalid. Must be a Gmail address';
    if (!loginId) newErrors.loginId = 'Login ID is missing';
    if (!password) newErrors.password = 'Password is missing';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is missing';
    if (!contactNumber) newErrors.contactNumber = 'Contact number is missing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/api/v1.0/shopping/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          navigate('/'); // Redirect to login on successful registration
        } else {
          setErrors({ form: result.msg || 'Registration failed' });
        }
      } catch (err) {
        setErrors({ form: 'An error occurred' });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="text-center">Register</h2>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'email', 'loginId', 'password', 'confirmPassword', 'contactNumber'].map(field => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
              <input
                type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                id={field}
                className="form-control"
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && <div className="text-danger">{errors[field]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-block">Register</button>
          <button
            type="button"
            className="btn btn-secondary btn-block mt-2"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
