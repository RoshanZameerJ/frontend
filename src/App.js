import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProductPage from './pages/ProductListPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import PrivateRoute from './components/PrivateRoute'; 
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/Product" element={<ProductPage />} />
          {/* Admin routes wrapped with PrivateRoute */}
          <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
