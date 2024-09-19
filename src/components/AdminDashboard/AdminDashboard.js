import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar
import './AdminDashboard.css'; // Import custom CSS

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', features: '', quantity: '' });
  const [updateForm, setUpdateForm] = useState({ name: '', description: '', price: '', features: '', quantity: '' });
  const [activeSection, setActiveSection] = useState('dashboard');
  const token = localStorage.getItem('authToken');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1.0/shopping/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [token]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1.0/shopping/all-orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [token]);

  useEffect(() => {
    if (activeSection === 'dashboard') {
      fetchProducts();
      fetchOrders();
    }
  }, [fetchProducts, fetchOrders, activeSection]);

  const handleAddProduct = async () => {
    try {
      await axios.post(`http://localhost:5000/api/v1.0/shopping/${form.name}/add`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setForm({ name: '', description: '', price: '', features: '', quantity: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1.0/shopping/${selectedProduct}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

 /* const handleUpdateProduct = async (id) => {
    try {
        if (!id) {
            console.error('No product ID provided');
            return;
        }

        console.log('Update Product ID:', id);
        console.log('Update Form Data:', updateForm);

        const response = await axios.put(
            `http://localhost:5000/api/v1.0/shopping/${updateForm.name}/update/${id}`,
            updateForm,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Update Response:', response.data);
        fetchProducts();
        setUpdateForm({ name: '', description: '', price: '', features: '', quantity: '' });
        setSelectedProduct(null);
    } catch (error) {
        console.error('Error updating product:', error);
    }
  };*/
  const handleUpdateProduct = async (id) => {
    try {
        if (!id) {
            console.error('No product ID provided');
            return;
        }

        // Convert features to an array of strings
        const formattedUpdateForm = {
            ...updateForm,
            features: Array.isArray(updateForm.features)
                ? updateForm.features
                : updateForm.features.split(',').map(feature => feature.trim()) // Ensure it’s an array
        };

        console.log('Updating product with ID:', id);
        console.log('Endpoint:', `http://localhost:5000/api/v1.0/shopping/${formattedUpdateForm.name}/update/${id}`);
        console.log('Request Body:', formattedUpdateForm);

        const response = await axios.put(
            `http://localhost:5000/api/v1.0/shopping/${formattedUpdateForm.name}/update/${id}`,
            formattedUpdateForm,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log('Update Response:', response.data);

        fetchProducts();
        setUpdateForm({ name: '', description: '', price: '', features: '', quantity: '' });
        setSelectedProduct(null);
        alert('Product updated successfully!');
    } catch (error) {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
};



 


  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prevForm => ({
        ...prevForm,
        [name]: value
    }));
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p._id === selectedProduct);
      if (product) {
        setUpdateForm({
          name: product.name,
          description: product.description,
          price: product.price,
          features: product.features,
          quantity: product.quantity,
        });
      }
    }
  }, [selectedProduct, products]);

  return (
    <div>
      <Navbar onNavClick={handleNavClick} />
      <div className="container my-5">
        <h1 className="mb-4">Admin Dashboard</h1>
        
        {activeSection === 'addProduct' && (
          <div className="mb-5">
            <h2 className="mb-3">Add Product</h2>
            <div className="form-group">
              <input type="text" className="form-control mb-2" name="name" placeholder="Product Name" value={form.name} onChange={handleInputChange} />
              <input type="text" className="form-control mb-2" name="description" placeholder="Description" value={form.description} onChange={handleInputChange} />
              <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={form.price} onChange={handleInputChange} />
              <input type="text" className="form-control mb-2" name="features" placeholder="Features (comma separated)" value={form.features} onChange={handleInputChange} />
              <input type="number" className="form-control mb-2" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleInputChange} />
              <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
        )}

        {activeSection === 'updateProduct' && (
          <div className="mb-5">
            <h2 className="mb-3">Update Product</h2>
            <div className="form-group">
              <select className="form-control mb-2" onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct || ''}>
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>{product.name}</option>
                ))}
              </select>
              <input type="text" className="form-control mb-2" name="name" placeholder="Product Name" value={updateForm.name} onChange={handleUpdateInputChange} />
              <input type="text" className="form-control mb-2" name="description" placeholder="Description" value={updateForm.description} onChange={handleUpdateInputChange} />
              <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={updateForm.price} onChange={handleUpdateInputChange} />
              <input type="text" className="form-control mb-2" name="features" placeholder="Features (comma separated)" value={updateForm.features} onChange={handleUpdateInputChange} />
              <input type="number" className="form-control mb-2" name="quantity" placeholder="Quantity" value={updateForm.quantity} onChange={handleUpdateInputChange} />
              <button className="btn btn-success" onClick={() => handleUpdateProduct(selectedProduct)}>Update Product</button>
            </div>
          </div>
        )}

        {activeSection === 'deleteProduct' && (
          <div className="mb-5">
            <h2 className="mb-3">Products List</h2>
            <ul className="list-group">
              {products.map(product => (
                <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center product-item">
                  {product.name} - ${product.price}
                  <div>
                    {/* <button className="btn btn-info btn-sm mx-1" onClick={() => setSelectedProduct(product._id)}>Select</button> */}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

{activeSection === 'viewOrders' && (
  <div className="orders-list">
    <h2 className="mb-3">Orders List</h2>
    <ul className="list-group">
      {orders.map(order => (
        <li key={order._id} className="order-item list-group-item">
          <div className="order-details">
            <div className="order-info">
              <strong>Product ID:</strong> {order.productId} <br />
              <strong>Quantity:</strong> {order.quantity}
            </div>
            <div className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </div>
          </div>
          <div className="order-timestamp">
            Created At: {new Date(order.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

       {/*  {activeSection === 'viewOrders' && (
  <div className="orders-list">
    <h2 className="mb-3">Orders List</h2>
    <ul className="list-group">
      {orders.map(order => (
        <li key={order._id} className="order-item list-group-item">
          <div className="order-details">
            <div className="order-info">
              Product ID: {order.productId} - Quantity: {order.quantity}
            </div>
            <div className={`order-status ${order.status.toLowerCase()}`}>
              Status: {order.status}
            </div>
          </div>
          <div className="order-timestamp">
            Created At: {new Date(order.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  </div>
)} */}


      </div>
    </div>
  );
};

export default AdminDashboard;
