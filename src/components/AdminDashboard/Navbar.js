// src/components/Navbar.js

import React from 'react';
//import './Navbar.css'; // Import custom CSS for Navbar

const Navbar = ({ onNavClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#!" onClick={() => onNavClick('dashboard')}>Admin Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#!" onClick={() => onNavClick('addProduct')}>Add Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!" onClick={() => onNavClick('updateProduct')}>Update Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!" onClick={() => onNavClick('deleteProduct')}>Delete Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!" onClick={() => onNavClick('viewOrders')}>View Orders</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
