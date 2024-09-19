import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('authToken');
  const loginId = localStorage.getItem('loginId');

  // Check if the user is authenticated and is an admin
  if (token && loginId === 'admin') {
    return <>{element}</>; 
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
